import React, {FC, useEffect, useMemo, useState} from 'react';
import Table from './Table';
import axios from 'axios';
import {API_URL} from '../interfaces/interface';
import { useLocation } from 'react-router-dom'

interface IOwnProps {
}

const Operations: FC<IOwnProps> = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Операции",
        columns: [
          {
            width: 40,
            Header: "Id",
            accessor: "id"
          },
          {
            width: 40,
            Header: "Тип операции",
            accessor: "type",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
                {cell.row.values.type === "INCOME" ? "Доход": "Расход"}
              </div>
            )
          },
          {
            width: 40,
            Header: "Сумма",
            accessor: "amount",
            Cell: (cell: any) => (
              <p>
                {cell.row.values.type === "INCOME" ? "+": "-"} {cell.row.values.amount}
              </p>
            )
          },
          {
            width: 40,
            Header: "Категория",
            accessor: "category"
          },
          {
            width: 10,
            Header: "Действия",
            accessor: "deleteAction",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
                {cell.row.values.type === "OUTCOME" ? <a href={"/products/" + cell.row.values.id}>
                  Продукты
                </a> : ""}
                <br/>
                <a href={"/account/" + cell.row.values.id}>
                  Редактировать
                </a>
                <br/>
                <a onClick={e => deleteAction(cell.row.values.id)} href={location.pathname}>
                  Удалить
                </a>
              </div>
            )
          }
        ]
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);

  const location = useLocation();
  const accountId = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  console.log(location.pathname);

  useEffect(() => {
    (async () => {

      const result = await axios.get(API_URL + "/operation/account/" + accountId);
      setData(result.data);
    })();
  }, [update]);

  const deleteAction = (id: number) => {
    axios.delete(API_URL + "/operation/" + id);
  };

  const operation = {
    accountId: accountId,
    type: "INCOME",
    categoryId: 1,
    amount: 0
  }

  const updateType = (e: any) => {
    operation.type = e.target.value;
  }

  const updateCategoryId = (e: any) => {
    operation.categoryId = e.target.value;
  }

  const updateAmount = (e: any) => {
    operation.amount = e.target.value;
  }

  const addOperation = () => {
    axios.post(API_URL + "/operation", operation);
    setUpdate([]);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="category">ID категории:</label>
        <input type="number" id="category" onChange={updateCategoryId}/>
        <br/>
        <label htmlFor="amount">Сумма:</label>
        <input type="number" id="amount" onChange={updateAmount}/>
        <br/>
        <label htmlFor="type">Выберите тип:</label>
        <select name="type" id="type" onChange={updateType}>
          <option value="INCOME">Доход</option>
          <option value="OUTCOME">Расход</option>
        </select>
        <br/>
        <button value="add" onClick={addOperation}>Добавить</button>
      </div>
      <br/>
      <br/>
      <Table columns={columns} data={data} searchName={"category"}/>
    </div>
  );
}

export default Operations;