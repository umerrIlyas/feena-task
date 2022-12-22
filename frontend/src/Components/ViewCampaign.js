import React, { useEffect, useState } from "react";
import { Badge, Card } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../config/config";

const ViewCampaign = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/campaigns/jobs");

    eventSource.onmessage = (payload) => {
      const parsedData = JSON.parse(payload.data);
      setData(parsedData);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const deleteCampaign = async (id) => {
    await axios.delete(`${baseURL}/campaigns/${id}`);
  };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {data.map((item) => {
        return (
          <Badge.Ribbon
            key={item.id}
            color={item.finishedOn ? "green" : ""}
            text={item.finishedOn ? "Finished" : "Processing"}
            placement="start"
          >
            <Card
              style={{
                marginTop: "20px",
              }}
              bordered={false}
              hoverable={true}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, marginTop: "10px" }}>
                    {item.data.data["Campaign Name"]}
                  </h2>
                  <p style={{ marginTop: 0 }}>
                    Emails: {item.progress}/{item.data.data.quantity}
                  </p>
                </div>
                <div>
                  <DeleteTwoTone
                    onClick={() => deleteCampaign(item.id)}
                    style={{
                      fontSize: "25px",
                    }}
                  />
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
        );
      })}
    </div>
  );
};

export default ViewCampaign;
