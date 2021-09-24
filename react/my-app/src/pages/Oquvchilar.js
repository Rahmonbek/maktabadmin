import React, { Component } from "react";
import { Table, Input, Button, Space, Modal, message, Select } from "antd";
import { Form } from "react-bootstrap";
import Highlighter from "react-highlight-words";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import ImageDemo from "./ImageDemo";
import {
  createPupils,
  deletePupils,
  editPupils,
  getClass,
  getPupils,
} from "../host/Config";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Option } from "antd/lib/mentions";
export default class Oquvchilar extends Component {
  state = {
    show: false,
    searchText: "",
    searchedColumn: "",
    image: null,
    // birthDay: new Date(),
    fatherName: "",
    fatherNumber: "",
    motherName: "",
    motherNumber: "",
    student: "",
    clas: null,
    classes: [],
    date: "2021-01-01",
    students: [
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Zohid o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
      //   {
      //     id: "0",
      //     fullname: "Ismoilov Rahmon Farhod o'g'li",
      //     date: "12.03.2000",
      //     address: "Imom-Buxoriy mahallasi Ibn-Sino ko'chasi 7-uy",
      //     father: "Rahmonov Zohid Ismoilovich",
      //     fatherNumber: "+998930820372",
      //     mother: "Qilichova Mamlakat Arslonova",
      //     motherNumber: "+998914191479",
      //     image:
      //       "https://www.nicepng.com/png/full/256-2566431_inspire-lifelong-courage-to-cultivate-character-child-student.png",
      //   },
    ],
    imageUrl: null,
    previewImage: false,
    editId: null,
    load: false,
  };

  getPupils = () => {
    getClass()
      .then((res) => {
        this.setState({ classes: res.data, clas: res.data[0].id });
        for (let j = 0; j < res.data.length; j++) {
          getPupils(res.data[j].id).then((res1) => {
            var pupils = this.state.students;
            pupils = pupils.concat(res1.data);
            for (
              let i = this.state.students.length;
              i < res1.data.length + this.state.students.length;
              i++
            ) {
              pupils[i].number = i + 1;
            }
            this.setState({ students: pupils });
          });
        }
        if (this.state.students === []) {
          message.error("O'quvchilar topilmadi!");
        }
      })
      .catch((err) => message.error("Sinflar topilmadi!"));
  };
  openModal = () => {
    this.setState({
      show: true,
    });
  };

  savePupils = () => {
    var formData = new FormData();
    formData.append("full_name", this.state.student ?? "");
    formData.append("birth_day", this.state.date ?? null);
    formData.append("clas", this.state.clas ?? null);
    formData.append("father_name", this.state.fatherName ?? "");
    formData.append("father_tel", this.state.fatherNumber ?? "");
    formData.append("mother_name", this.state.motherName ?? "");
    formData.append("mother_tel", this.state.motherNumber ?? "");
    if (this.state.editId !== null) {
      if (this.state.image !== null) {
        formData.append("image", this.state.image ?? null);
      }
      editPupils(formData, this.state.editId)
        .then((res) => {
          console.log(res.data);
          this.setState({ students: [] });
          this.getPupils();
          message.success("O'quvchi ma'lumotlari o'zgartirildi.");
        })
        .catch((err) =>
          message.success("O'quvchi ma'lumotlari o'zgartirilmadi!")
        );
    } else {
      formData.append("image", this.state.image ?? null);
      createPupils(formData)
        .then((res) => {
          this.setState({ students: [] });
          this.getPupils();
          message.success("O'quvchi qo'shildi.");
        })
        .catch((err) => {
          message.error("O'quvchi qo'shilmadi!");
        });
    }
    this.handleClose();
  };

  deletePupils = (id) => {
    deletePupils(this.state.students[id].id)
      .then((res) => {
        this.setState({ students: [] });
        this.getPupils();
        message.success("Ma'lumot o'chirildi.");
      })
      .catch((err) => message.error("Ma'lumot o'chirilmadi!"));
  };

  editPupils = (id) => {
    this.setState({
      student: this.state.students[id].full_name,
      date: this.state.students[id].birth_day,
      fatherName: this.state.students[id].father_name,
      motherName: this.state.students[id].mother_name,
      fatherNumber: this.state.students[id].father_tel,
      motherNumber: this.state.students[id].mother_tel,
      imageUrl: this.state.students[id].image,
      previewImage: true,
      editId: this.state.students[id].id,
    });
    this.openModal();
  };

  handleClose = () => {
    this.setState({
      show: false,
      image: null,
      fatherName: "",
      fatherNumber: "",
      motherName: "",
      motherNumber: "",
      student: "",
      date: "2021-01-01",
      imageUrl: null,
      previewImage: false,
      clas: this.state.classes[0].id,
    });
    document.getElementById("formBasicimage").value = "";
  };

  customRequest = (e) => {
    let image = e.target.files[0];
    this.setState({
      image: image,
      imageUrl: image,
      previewImage: false,
    });
  };

  componentDidMount() {
    this.getPupils();
    var students = this.state.students;
    students.map((item, key) => {
      item.number = key + 1;
    });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  changeName = (e) => {
    this.setState({ student: e.target.value });
  };

  changeDate = (e) => {
    this.setState({ date: e.target.value });
  };

  changeFatherName = (e) => {
    this.setState({ fatherName: e.target.value });
  };

  changeFatherNumber = (e) => {
    this.setState({ fatherNumber: e.target.value });
  };

  changeMotherName = (e) => {
    this.setState({ motherName: e.target.value });
  };

  changeMotherNumber = (e) => {
    this.setState({ motherNumber: e.target.value });
  };

  changeClass = (e) => {
    this.setState({ clas: e });
  };

  render() {
    const columns = [
      {
        title: "T/r",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Rasm",
        dataIndex: "image",
        key: "image",
        width: "10%",
        render: (image) => {
          return ImageDemo(image);
        },
      },
      {
        title: "F.I.Sh.",
        dataIndex: "full_name",
        key: "full_name",
        ...this.getColumnSearchProps("full_name"),
        sorter: (a, b) => a.full_name.length - b.full_name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Tug'ilgan sana",
        dataIndex: "birth_day",
        key: "birth_day",
        ...this.getColumnSearchProps("birth_day"),
      },
      {
        title: "Otasi",
        dataIndex: "father_name",
        key: "father_name",
        ...this.getColumnSearchProps("father_name"),
      },
      {
        title: "Otasining nomeri",
        dataIndex: "father_tel",
        key: "father_tel",
        ...this.getColumnSearchProps("father_tel"),
      },
      {
        title: "Onasi",
        dataIndex: "mother_name",
        key: "mother_name",

        ...this.getColumnSearchProps("mother_name"),
      },
      {
        title: "Onasining nomeri",
        dataIndex: "mother_tel",
        key: "mother_tel",
        ...this.getColumnSearchProps("mother_tel"),
      },
      {
        title: "Amallar",
        dataIndex: "number",
        key: "number",
        width: "10%",
        render: (number) => {
          return (
            <div>
              <AiFillEdit
                style={{
                  fontSize: "16px",
                  color: "green",
                  marginLeft: "5px",
                  marginTop: "-5px",
                }}
                onClick={() => {
                  this.editPupils(number - 1);
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <AiOutlineDelete
                style={{
                  fontSize: "16px",
                  color: "red",
                  marginLeft: "5px",
                  marginTop: "-5px",
                }}
                onClick={() => {
                  this.deletePupils(number - 1);
                }}
              />
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Button
          onClick={this.openModal}
          style={{
            position: "absolute",
            top: "15px",
            // backgroundColor: "#001529",
            // borderColor: "#001529",
          }}
          type="primary"
          icon={<FormOutlined style={{ transform: "translate(0px, -2px)" }} />}
        >
          O'quvchi qo'shish
        </Button>{" "}
        {this.state.classes !== [] ? (
          <>
            <Table
              columns={columns}
              dataSource={this.state.students}
              bordered="true"
              style={{ marginTop: "20px" }}
            />{" "}
          </>
        ) : (
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "red",
              fontSize: "25px",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            Iltimos avval sinflarni tashkil eting!
          </div>
        )}
        <Modal
          title="O'quvchi qo'shish"
          visible={this.state.show}
          footer={false}
          style={{ top: "0px" }}
          onCancel={this.handleClose}
        >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicfullname">
              <Form.Label>O'quvchining F.I.Sh. i</Form.Label>
              <Form.Control
                type="text"
                placeholder="F.I.Sh."
                value={this.state.student}
                onChange={this.changeName}
              />
            </Form.Group>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicdate">
              <Form.Label>O'quvchining tug'ilgan sanasi</Form.Label>
              <Form.Control
                type="date"
                placeholder="Sana"
                onChange={this.changeDate}
                value={this.state.date}
              />
            </Form.Group>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicimage">
              <Form.Label>O'quvchining rasmi</Form.Label>
              <Form.Control
                className="formInput"
                accept=".jpg, .jpeg, .png"
                onChange={this.customRequest}
                required
                type="file"
              />
              {this.state.previewImage ? ImageDemo(this.state.imageUrl) : ""}
            </Form.Group>
            <hr />

            {this.state.classes !== [] ? (
              <>
                <Form.Group className="mb-3" controlId="formBasicclas">
                  <Form.Label>O'quvchining sinfi</Form.Label>
                  <Select
                    placeholder="Select a person"
                    style={{ width: "100%" }}
                    onSelect={this.changeClass}
                    value={this.state.clas}
                  >
                    {this.state.classes.map((item) => {
                      return (
                        <Option value={item.id}>
                          {item.class_number}-{item.class_char}
                        </Option>
                      );
                    })}
                  </Select>
                  ,
                </Form.Group>
                <hr />
              </>
            ) : (
              ""
            )}

            <Form.Group className="mb-3" controlId="formBasicfather">
              <Form.Label>O'quvchining otasining F.I.Sh.i</Form.Label>
              <Form.Control
                type="text"
                placeholder="Otasining F.I.Sh.i"
                onChange={this.changeFatherName}
                value={this.state.fatherName}
              />
            </Form.Group>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicfatherNumber">
              <Form.Label>O'quvchining otasining telefon nomeri</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefon nomer"
                onChange={this.changeFatherNumber}
                value={this.state.fatherNumber}
              />
            </Form.Group>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicmother">
              <Form.Label>O'quvchining onasining F.I.Sh.i</Form.Label>
              <Form.Control
                type="text"
                placeholder="Onasining F.I.Sh.i"
                onChange={this.changeMotherName}
                value={this.state.motherName}
              />
            </Form.Group>
            <hr />

            <Form.Group className="mb-3" controlId="formBasicmotherNumber">
              <Form.Label>O'quvchining onasining telefon nomeri</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefon nomer"
                onChange={this.changeMotherNumber}
                value={this.state.motherNumber}
              />
            </Form.Group>
            <hr />

            <Button
              style={{ marginRight: "15px" }}
              onClick={this.handleClose}
              type="danger"
            >
              Bekor qilish
            </Button>
            <Button onClick={this.savePupils} type="primary">
              Saqlash
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
