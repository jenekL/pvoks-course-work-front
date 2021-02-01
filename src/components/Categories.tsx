import React, {FC, useEffect, useMemo, useState} from 'react';
import Table from './Table';
import axios from 'axios';
import {API_URL} from '../interfaces/interface';

interface IOwnProps {
  userId: number
}

const Categories: FC<IOwnProps> = ({userId}) => {
  const deleteAction = (id: number) => {
    axios.delete(API_URL + "/category/" + id);
    userId = 1;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Категории",
        columns: [
          {
            width: 40,
            Header: "Id",
            accessor: "id"
          },
          {
            width: 40,
            Header: "Наименование",
            accessor: "title"
          },
          {
            width: 40,
            Header: "Тип",
            accessor: "type",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
                {cell.row.values.type === "SYSTEM" ? "Системный" : "Пользовательский"}
              </div>
            )
          },
          {
            width: 10,
            Header: "Действия",
            accessor: "deleteAction",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
                {cell.row.values.type === "USER" ?
                  <div>
                    <a href={"/category/" + cell.row.values.id}>
                      Редактировать
                    </a>
                    <br/>
                    <a onClick={e => deleteAction(cell.row.values.id)} href={"/categories"}>
                      Удалить
                    </a>
                  </div>
                  : ""
                }
              </div>
            )
          }
        ]
      },
      // {
      //   Header: "Details",
      //   columns: [
      //     {
      //       Header: "Language",
      //       accessor: "show.language"
      //     },
      //     {
      //       Header: "Status",
      //       accessor: "show.status"
      //     }
      //   ]
      // }
    ],
    []
  );

  const updateData = () => {
    (async () => {
      const result = await axios.get(API_URL + "/category/" + userId);
      setData(result.data);
    })();
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    updateData();
  }, [userId]);

  const category = {
    userId: userId,
    title: "",
    type: "USER"
  }

  const updateTitle = (e: any) => {
    category.title = e.target.value;
  }

  const addCategory = () => {
    axios.post(API_URL + "/category", category);
    setTimeout(updateData, 1000);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="name">Наименование:</label>
        <input type="text" id="name" onChange={updateTitle}/>
        <br/>
        <button value="add" onClick={addCategory}>Добавить</button>
      </div>
      <br/>
      <br/>
      <Table columns={columns} data={data} searchName={"title"}/>
    </div>
  );
};

export default Categories;