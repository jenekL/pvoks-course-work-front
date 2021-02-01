import React, {FC, useEffect, useMemo, useState} from 'react';
import Table from './Table';
import axios from 'axios';
import {API_URL} from '../interfaces/interface';
import {useLocation} from 'react-router-dom';

interface IOwnProps {
}

const Accounts: FC<IOwnProps> = () => {
  const deleteAction = (id: number) => {
    axios.delete(API_URL + "/product/" + id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Продукты",
        columns: [
          {
            width: 40,
            Header: "Id",
            accessor: "id"
          },
          {
            width: 40,
            Header: "Наименование",
            accessor: "name"
          },
          {
            width: 40,
            Header: "Стоимость",
            accessor: "cost"
          },
          {
            width: 40,
            Header: "Категория",
            accessor: "category",
            Cell: (cell: any) => (
              <div>
                {cell.row.values.category === "MEAT" ? "Мясо" : "Вода"}
              </div>
            )
          },
          {
            width: 10,
            Header: "Действия",
            accessor: "deleteAction",
            Cell: (cell: any) => (
              <div style={{width: 20}}>
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
  const operationId = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  console.log(location.pathname);

  useEffect(() => {
    (async () => {
      const result = await axios.get(API_URL + "/product/operation/" + operationId);
      console.log(1);
      setData(result.data);
    })();
  }, [update]);

  const product = {
    name: "",
    operationId: operationId,
    cost: 0,
    category: "MEAT"
  };

  const updateName = (e: any) => {
    product.name = e.target.value;
  }

  const updateCost = (e: any) => {
    product.cost = e.target.value;
  }

  const updateCategory = (e: any) => {
    product.category = e.target.value;
    console.log(product.category);
  }

  const addProduct = () => {
    axios.post(API_URL + "/product/", product);
    setUpdate([]);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="name">Наименование:</label>
        <input type="text" id="name" onChange={updateName}/>
        <br/>
        <label htmlFor="cost">Стоимость:</label>
        <input type="text" id="cost" onChange={updateCost}/>
        <br/>
        <label htmlFor="category">Выберите категорию:</label>
        <select name="category" id="category" onChange={updateCategory}>
          <option value="MEAT">Мясо</option>
          <option value="WATER">Вода</option>
        </select>
        <br/>
        <button value="add" onClick={addProduct}>Добавить</button>
      </div>
      <br/>
      <br/>
      <Table columns={columns} data={data}/>
    </div>
  );
}

export default Accounts;