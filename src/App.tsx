import "./App.css";
import React, { useState } from "react";
import {
  Input,
  Space,
  Button,
  Divider,
  Tag,
  Rate,
  Row,
  Col,
  Checkbox,
  Radio,
  Card,
} from "antd";
import { Menu, Dropdown } from "antd";

import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MathpixMarkdown, MathpixLoader } from "mathpix-markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const FileSaver = require("file-saver");
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
interface Ques {
  type: "单选" | "多选" | "简答" | "判断" | "填空" | "改错" | "其他"; // 类型

  typename: string; //类型名

  difficulty: number; // 难度

  video: string; //视频解析

  testcentre: string; //考点

  keyword: string; //关键词

  title: string; //标题

  cqans: string | undefined; //选择题答案

  jqans: "正确" | "错误" | undefined; //判断题答案

  fbans: string | undefined; //填空题答案

  saand: string | undefined; //简答题答案

  options: string | undefined; //选择题选项

  analysis: string; //文字解析
}
interface Select {
  key: string;
  value: string;
}

function addQues() {}
function App() {
  const [quesList, setQuesList] = useState<Ques[]>([]);
  const [ques, setQues] = useState<Ques>({
    type: "单选",
    typename: "",
    difficulty: 1,
    video: "",
    testcentre: "",
    keyword: "",
    title: "",
    cqans: "",
    jqans: "正确",
    fbans: "",
    saand: "",
    options: "",
    analysis: "",
  });
  const [selectList, setSelectList] = useState([
    {
      key: "A",
      value: "",
    },
    {
      key: "B",
      value: "",
    },
    {
      key: "C",
      value: "",
    },
    {
      key: "D",
      value: "",
    },
  ]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const [blankList, setBlankList] = useState<string[]>(["", ""]);
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        <Button
          onClick={() => {
            console.log(quesList);
            let blob = new Blob([JSON.stringify(quesList)], {
              type: "text/plain;charset=utf-8",
            });
            FileSaver.saveAs(blob, new Date().getTime() + ".json");
          }}
          type="ghost"
        >
          导出
        </Button>
        <Collapse accordion>
          {quesList.map((v, i) => {
            return (
              <Panel
                header={i + 1 + "." + v.type + "  " + v.title.substr(0, 10)}
                key={i}
              >
                <Space direction="vertical">
                  <Space>
                    <Button
                      onClick={() => {
                        setEditing(true);
                        setEditIndex(i);
                        setQues(v);
                        if (v.cqans) {
                          setCheckedList(JSON.parse(v.cqans));
                        }
                        if (v.fbans) {
                          setBlankList(JSON.parse(v.fbans));
                        }
                        if (v.options) {
                          setSelectList(JSON.parse(v.options));
                        }
                      }}
                    >
                      修改
                    </Button>
                    <Button
                      onClick={() => {
                        quesList.splice(i, 1);
                        setQuesList([...quesList]);
                      }}
                    >
                      删除
                    </Button>
                  </Space>
                  <Card style={{ width: 300 }}>
                    <MathpixLoader>
                      <MathpixMarkdown text={v.title} />
                    </MathpixLoader>
                  </Card>
                  <span>类型名:{v.typename}</span>
                  <span>考点：{v.testcentre}</span>
                  {v.options ? <span> "选项字符串：" + v.options </span> : null}
                  {v.fbans ? <span> "填空答案字符串：" + v.fbans </span> : null}
                  {v.options ? <span> "选项字符串：" + v.options </span> : null}
                  {v.type == "判断" ? (
                    <span>"判断题答案：" + v.jqans</span>
                  ) : null}
                  {v.type == "改错" || v.type == "简答" || v.type == "其他" ? (
                    <span>"文字题答案：" + v.saand</span>
                  ) : null}
                  <span>解析：{v.analysis}</span>
                  <span>视频解析链接：{v.video}</span>

                  <span>难度：{v.difficulty}</span>
                </Space>
              </Panel>
            );
          })}
        </Collapse>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: "100%", padding: 20 }}>
        <Space>
          <span style={{ width: 150 }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() => {
                      checkedList[0] && setCheckedList([checkedList[0]]);
                      setQues({
                        ...ques,
                        type: "单选",
                        cqans: JSON.stringify(
                          checkedList[0] ? [checkedList[0]] : []
                        ),
                      });
                    }}
                  >
                    单选
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      checkedList[0] && setCheckedList([checkedList[0]]);
                      setQues({
                        ...ques,
                        type: "多选",
                      });
                    }}
                  >
                    多选
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setQues({
                        ...ques,
                        type: "简答",
                      });
                    }}
                  >
                    简答
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setQues({
                        ...ques,
                        type: "判断",
                      });
                    }}
                  >
                    判断
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setQues({
                        ...ques,
                        type: "填空",
                      });
                    }}
                  >
                    填空
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setQues({
                        ...ques,
                        type: "改错",
                      });
                    }}
                  >
                    改错
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      setQues({
                        ...ques,
                        type: "其他",
                      });
                    }}
                  >
                    其他
                  </Menu.Item>
                </Menu>
              }
            >
              <span
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                题目类型： {ques.type} <DownOutlined />
              </span>
            </Dropdown>
          </span>
          <span>
            类型名：
            <Input
              style={{ width: 100 }}
              value={ques.typename}
              onChange={({ target: { value } }) => {
                setQues({
                  ...ques,
                  typename: value,
                });
              }}
            />
          </span>
          <Tag color="geekblue">已录入{quesList.length}条数据</Tag>
        </Space>
        <div>
          标题：
          <MdEditor
            value={ques.title}
            style={{ height: "300px" }}
            onChange={(html, text) => {
              setQues({
                ...ques,
                title: text?.target.value ? text?.target.value : "",
              });
            }}
            renderHTML={(text) => {
              return (
                <MathpixLoader>
                  <MathpixMarkdown text={text} />
                </MathpixLoader>
              );
            }}
          ></MdEditor>
        </div>
        {ques.type.indexOf("选") > -1 ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            选项：
            {selectList.map((v, i) => {
              return (
                <Row key={i}>
                  <Col flex="50px">
                    <Input
                      maxLength={1}
                      onChange={({ target: { value } }) => {
                        value = value.toUpperCase();
                        let keyset = selectList.map((v) => {
                          return v.key;
                        });
                        if (keyset.indexOf(value) > -1) {
                        } else {
                          selectList[i].key = value;
                          setSelectList([...selectList]);
                          setQues({
                            ...ques,
                            options: JSON.stringify(selectList),
                          });
                        }
                      }}
                      style={{ textAlign: "center" }}
                      value={v.key}
                    ></Input>
                  </Col>
                  <Col flex="auto">
                    <Input
                      onChange={({ target: { value } }) => {
                        selectList[i].value = value;
                        setSelectList([...selectList]);
                        setQues({
                          ...ques,
                          options: JSON.stringify(selectList),
                        });
                      }}
                      value={v.value}
                    ></Input>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        let index = checkedList.indexOf(selectList[i].key);
                        if (index > -1) {
                          checkedList.splice(index, 1);
                        }
                        selectList.splice(i, 1);
                        setSelectList([...selectList]);
                        setQues({
                          ...ques,
                          options: JSON.stringify(selectList),
                          cqans: JSON.stringify(checkedList),
                        });
                      }}
                      type="dashed"
                    >
                      删除
                    </Button>
                  </Col>
                </Row>
              );
            })}
            <Button
              onClick={() => {
                selectList.push({
                  key: "",
                  value: "",
                });
                setSelectList([...selectList]);
              }}
            >
              增加
            </Button>
            选择题答案：
            <CheckboxGroup
              options={selectList.map((v) => {
                return v.key;
              })}
              value={checkedList}
              onChange={(value) => {
                let _c = value.map((v) => v.toString());
                if (checkedList.length == 1 && ques.type == "单选") {
                  _c = [..._c].filter((x) => !checkedList.includes(x));
                }
                setCheckedList(_c);
                setQues({
                  ...ques,
                  cqans: JSON.stringify(_c),
                });
              }}
            />
          </Space>
        ) : null}
        {ques.type == "判断" ? (
          <div>
            <span>判断题答案： </span>
            <Radio.Group
              onChange={(value) => {
                setQues({
                  ...ques,
                  jqans: value.target.value,
                });
              }}
              value={ques.jqans}
            >
              <Radio value={"正确"}>正确</Radio>
              <Radio value={"错误"}>错误</Radio>
            </Radio.Group>
          </div>
        ) : null}
        {ques.type == "填空" ? (
          <Space direction="vertical">
            <Row justify="start">
              {blankList.map((v, i) => {
                return (
                  <Col key={i} style={{ width: 200 }}>
                    <Input
                      placeholder={"第" + (i + 1) + "个空"}
                      style={{ width: 100 }}
                      value={blankList[i]}
                      onChange={({ target: { value } }) => {
                        blankList[i] = value;
                        setBlankList([...blankList]);
                        setQues({
                          ...ques,
                          fbans: JSON.stringify(blankList),
                        });
                      }}
                    ></Input>
                    <Button
                      onClick={() => {
                        blankList.splice(i, 1);
                        setBlankList([...blankList]);
                        setQues({
                          ...ques,
                          fbans: JSON.stringify(blankList),
                        });
                      }}
                      type="dashed"
                    >
                      删除
                    </Button>
                  </Col>
                );
              })}
            </Row>
            <Button
              onClick={() => {
                blankList.push("");
                setBlankList([...blankList]);
              }}
            >
              增加填空
            </Button>
          </Space>
        ) : null}
        {ques.type == "简答" ? (
          <div>
            <TextArea
              rows={4}
              placeholder="简答题答案"
              value={ques.saand}
              onChange={({ target: { value } }) => {
                setQues({
                  ...ques,
                  saand: value,
                });
              }}
            />
          </div>
        ) : null}
        {ques.type == "改错" || ques.type == "其他" ? (
          <div>
            <TextArea
              onChange={({ target: { value } }) => {
                setQues({
                  ...ques,
                  saand: value,
                });
              }}
              rows={5}
              placeholder={(ques.type == "改错" ? "改错" : "") + "答案"}
            />
          </div>
        ) : null}
        视频解析链接：
        <Input
          placeholder="视频解析链接"
          value={ques.video}
          onChange={({ target: { value } }) => {
            setQues({
              ...ques,
              video: value,
            });
          }}
        />
        文字解析：
        <TextArea
          rows={4}
          value={ques.analysis}
          onChange={({ target: { value } }) => {
            setQues({
              ...ques,
              analysis: value,
            });
          }}
          placeholder="文字解析"
        />
        关键词:
        <Input
          placeholder="关键词"
          value={ques.keyword}
          onChange={({ target: { value } }) => {
            setQues({
              ...ques,
              keyword: value,
            });
          }}
        />
        考点:
        <Input
          placeholder="考点"
          value={ques.testcentre}
          onChange={({ target: { value } }) => {
            setQues({
              ...ques,
              testcentre: value,
            });
          }}
        />
        <span>
          难度：
          <Rate
            allowClear={false}
            onChange={(v) => {
              setQues({
                ...ques,
                difficulty: v,
              });
            }}
            value={ques.difficulty}
          />
        </span>
        <Space>
          <Button
            onClick={() => {
              let _q = {
                type: ques.type,
                typename: ques.typename == "" ? ques.type : ques.typename,
                difficulty: ques.difficulty,
                video: ques.video,
                testcentre: ques.testcentre,
                keyword: ques.keyword,
                title: ques.title,
                cqans:
                  ques.type == "多选" || ques.type == "单选"
                    ? ques.cqans
                    : undefined,
                jqans: ques.type == "判断" ? ques.jqans : undefined,
                fbans: ques.type == "填空" ? ques.fbans : undefined,
                saand:
                  ques.type == "简答" ||
                  ques.type == "改错" ||
                  ques.type == "其他"
                    ? ques.saand
                    : undefined,
                options:
                  ques.type == "多选" || ques.type == "单选"
                    ? ques.options
                    : undefined,
                analysis: ques.analysis,
              };
              quesList.push(_q);
              setQues({
                ...ques,
                type: "单选",
                typename: "",
                difficulty: 1,
                video: "",
                testcentre: "",
                keyword: "",
                title: "",
                cqans: "",
                jqans: "正确",
                fbans: "",
                saand: "",
                options: "",
                analysis: "",
              });
              setBlankList(["", ""]);
              setCheckedList([]);
              setSelectList([
                {
                  key: "A",
                  value: "",
                },
                {
                  key: "B",
                  value: "",
                },
                {
                  key: "C",
                  value: "",
                },
                {
                  key: "D",
                  value: "",
                },
              ]);
              setQuesList([...quesList]);
            }}
            type="primary"
          >
            添加
          </Button>
          {editing ? (
            <Button
              onClick={() => {
                setEditing(false);
                let _q = {
                  type: ques.type,
                  typename: ques.typename == "" ? ques.type : ques.typename,
                  difficulty: ques.difficulty,
                  video: ques.video,
                  testcentre: ques.testcentre,
                  keyword: ques.keyword,
                  title: ques.title,
                  cqans:
                    ques.type == "多选" || ques.type == "单选"
                      ? ques.cqans
                      : undefined,
                  jqans: ques.type == "判断" ? ques.jqans : undefined,
                  fbans: ques.type == "填空" ? ques.fbans : undefined,
                  saand:
                    ques.type == "简答" ||
                    ques.type == "改错" ||
                    ques.type == "其他"
                      ? ques.saand
                      : undefined,
                  options:
                    ques.type == "多选" || ques.type == "单选"
                      ? ques.options
                      : undefined,
                  analysis: ques.analysis,
                };
                quesList[editIndex] = _q;
                setQues({
                  ...ques,
                  type: "单选",
                  typename: "",
                  difficulty: 1,
                  video: "",
                  testcentre: "",
                  keyword: "",
                  title: "",
                  cqans: "",
                  jqans: "正确",
                  fbans: "",
                  saand: "",
                  options: "",
                  analysis: "",
                });
                setBlankList(["", ""]);
                setCheckedList([]);
                setSelectList([
                  {
                    key: "A",
                    value: "",
                  },
                  {
                    key: "B",
                    value: "",
                  },
                  {
                    key: "C",
                    value: "",
                  },
                  {
                    key: "D",
                    value: "",
                  },
                ]);
                setQuesList([...quesList]);
              }}
              type="ghost"
            >
              保存
            </Button>
          ) : null}
        </Space>
      </Space>
    </div>
  );
}

export default App;
