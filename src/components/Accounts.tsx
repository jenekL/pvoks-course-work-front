import React, {FC, useEffect, useMemo, useState} from 'react';
import Table from './Table';
import axios from 'axios';
import {API_URL} from '../interfaces/interface';

interface IOwnProps {
  userId: number
}

const Accounts: FC<IOwnProps> = ({userId}) => {
  const deleteAction = (id: number) => {
    axios.delete(API_URL + "/account/" + id);
    userId=1;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Аккаунты",
        columns: [
          {
            width: 40,
            Header: "Id",
            accessor: "id"
          },
          {
            width: 40,
            Header: "Имя",
            accessor: "name"
          },
          {
            width: 10,
            Header: "Действия",
            accessor: "deleteAction",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
                <a href={"/operations/" + cell.row.values.id}>
                  Операции
                </a>
                <br/>
                <a href={"/account/" + cell.row.values.id}>
                  Редактировать
                </a>
                <br/>
                <a onClick={e => deleteAction(cell.row.values.id)} href={"/account"}>
                  Удалить
                </a>
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

  const [data, setData] = useState([]);

  const updateData = () => {
    (async () => {
      const result = await axios.get(API_URL + "/account/user/" + userId);
      setData(result.data);
    })();
  }

  useEffect(() => {
    updateData();
  }, []);

  const account = {
    userId: userId,
    name: ""
  };

  const updateName = (e: any) => {
    account.name = e.target.value;
  }

  const addAccount = () => {
    axios.post(API_URL + "/account", account);
    setTimeout(updateData, 1000);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="name">Наименование:</label>
        <input type="text" id="name" onChange={updateName}/>
        <br/>
        <button value="add" onClick={addAccount}>Добавить</button>
      </div>
      <br/>
      <br/>
      <Table columns={columns} data={data}/>
    </div>
  );
}

export default Accounts;