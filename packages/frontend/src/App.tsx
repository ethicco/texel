import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Layout,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import axios from "axios";
import settings from "./settings";

import "antd/dist/reset.css";
import "./App.css";

function App() {
  const [data, setData] = useState<null | Config>(null);
  const [error, setError] = useState<null | RequestError["message"]>(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState("");

  const request = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Config>(`${settings.apiUrl}/config`);

      setData(data);
    } catch (err) {
      const error = err as RequestError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSumbit = async () => {
    const formData = {
      input_num: +(data?.parameters.input[0].value as string),
      input_text: data?.parameters.input[1].value,
    };

    setPending(true);
    const res = await axios.post<string>(`${settings.apiUrl}/run`, formData);
    setResult(res.data);
    setPending(false);
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <Layout className="app">
      <Header className="header">My service</Header>
      <Content className="content">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row>
            <Col span={24}>
              <Card
                title={data?.title}
                bordered={false}
                style={{ width: "25rem" }}
              >
                <p>Name: {data?.name}</p>
                <p>Description: {data?.description}</p>
                <div>
                  {data?.parameters.input.map((parameter, i) => {
                    if (parameter.type === "select") {
                      return (
                        <Select
                          placeholder={parameter.name}
                          options={parameter.items?.map((el) => ({
                            value: el.value,
                            label: el.title,
                          }))}
                          style={{ width: "100%", marginTop: "1rem" }}
                          onChange={(value: string) => {
                            setData({
                              ...data,
                              parameters: {
                                ...data.parameters,
                                input: data.parameters.input.map(
                                  (item, index) => {
                                    if (index === i) {
                                      return { ...item, value };
                                    }

                                    return item;
                                  },
                                ),
                              },
                            });
                          }}
                          key={i}
                        />
                      );
                    }
                    return (
                      <Input
                        key={i}
                        type="number"
                        value={parameter.value}
                        placeholder={parameter.name}
                        onChange={(e) => {
                          const { value } = e.target;

                          setData({
                            ...data,
                            parameters: {
                              ...data.parameters,
                              input: data.parameters.input.map(
                                (item, index) => {
                                  if (index === i) {
                                    return { ...item, value };
                                  }

                                  return item;
                                },
                              ),
                            },
                          });
                        }}
                      />
                    );
                  })}
                </div>
                <Button
                  loading={pending}
                  type="primary"
                  style={{ marginTop: "1rem" }}
                  onClick={onSumbit}
                >
                  Запустить
                </Button>
              </Card>
              <Typography.Paragraph style={{ marginTop: "1rem" }}>
                {result}
              </Typography.Paragraph>
            </Col>
          </Row>
        )}
      </Content>
      <Footer className="footer">Copyright Ⓒ {new Date().getFullYear()}</Footer>
    </Layout>
  );
}

export default App;
