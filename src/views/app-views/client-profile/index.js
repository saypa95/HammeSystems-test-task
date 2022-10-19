import React, { useEffect, useState } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { getUsers } from "services/PlaceHolderService";
import Loading from "components/shared-components/Loading";

function ClientProfile() {
  const { clientId } = useParams();

  const [client, setCLient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onRequest();
    return () => {
      setCLient({});
    };
  }, [clientId]);

  function onRequest() {
    getUsers().then(onClientLoaded);
  }

  function onClientLoaded(res) {
    const client = res.find((item) => item.id === +clientId);
    setCLient(client);
    setLoading(false);
  }

  const content = loading ? <Loading /> : <CLientView client={client} setLoading={setLoading} />;

  return <>{content}</>;
}

const CLientView = ({ client, setLoading }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { name, email, username, phone, website, address, city, zipcode } = client;

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      history.push(`${match}/..`);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={{
            name: name,
            email: email,
            username: username,
            phone: phone,
            website: website,
            address: address,
            city: city,
            zipcode: zipcode,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Post code" name="zipcode">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ClientProfile;
