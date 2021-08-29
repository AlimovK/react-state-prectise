import React, { Component } from "react";
import { Data } from "./mock";

export default class App extends Component {
  state = {
    list: Data,
    name: "",
    status: "",
    selected: null,
  };
  render() {
    //edit function =====================
    const onChangeName = (e) => {
      this.setState({ name: e.target.value });
    };
    const onChangeStatus = (e) => {
      this.setState({ status: e.target.value });
    };
    const onSelect = (e) => {
      this.setState({
        name: e.name,
        status: e.status,
        selected: e.id,
      });
    };
    const onSave = () => {
      let newData = this.state.list.map((value) =>
        value.id === this.state.selected
          ? { ...value, name: this.state.name, status: this.state.status }
          : value
      );
      this.setState({ list: newData, selected: null });
    };

    //delete function========================
    const onDelete = (id) => {
      // console.log(id);
      const newData = this.state.list.filter((value) => value.id !== id);
      this.setState({ list: newData });
    };
    //add function ===========================

    const onName = (e) => {
      this.setState({ name: e.target.value });
    };
    const onStatus = (e) => {
      this.setState({ status: e.target.value });
    };
    const onAdd = () => {
      const info = {
        id: this.state.list.length + 1,
        name: this.state.name,
        status: this.state.status,
      };
      const newData = [...this.state.list, info];
      info.name !== "" && info.status !== ""
        ? this.setState({ list: newData })
        : alert("please fill on input");
    };
    return (
      <div>
        <input type="text" onChange={onName} placeholder="name" />
        <input type="text" onChange={onStatus} placeholder="status" />
        <button onClick={onAdd}>Add</button>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.id}</td>

                  <td>
                    {this.state.selected === value.id ? (
                      <input
                        type="text"
                        onChange={onChangeName}
                        value={this.state.name}
                      />
                    ) : (
                      value.name
                    )}
                  </td>

                  <td>
                    {this.state.selected === value.id ? (
                      <input
                        type="text"
                        onChange={onChangeStatus}
                        value={this.state.status}
                      />
                    ) : (
                      value.status
                    )}
                  </td>
                  <td>
                    {this.state.selected === value.id ? (
                      <button onClick={onSave}>save</button>
                    ) : (
                      <button onClick={() => onSelect(value)}>edit</button>
                    )}
                    <button onClick={() => onDelete(value.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
