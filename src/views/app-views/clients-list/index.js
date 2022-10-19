import React, { useEffect, useState } from 'react'
import { Card, Table, Tooltip, Button } from 'antd';
import {DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getUsers } from "services/PlaceHolderService";
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const ClientList = (props) => {
  let match = useRouteMatch(); 

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onRequest();
    return () => {
      setClients([]);
    };
  }, []);

  function onRequest() {
    getUsers().then(onClientListLoaded)
  }

  function onClientListLoaded(list){
    setClients(list);
    setLoading(false);
  }


  const deleteClient = clientId => {
    setClients(clients => [...clients].filter(item => item.id !== clientId));
  }

		const tableColumns = [
			{
				title: 'Client',
				dataIndex: 'name',
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Email',
				dataIndex: 'email',
				sorter: {
					compare: (a, b) => {
						a = a.email.toLowerCase();
  						b = b.email.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Address',
				dataIndex: 'address',
				sorter: {
					compare: (a, b) => {
						a = a.address.toLowerCase();
  						b = b.address.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Website',
				dataIndex: 'website',
				sorter: {
					compare: (a, b) => {
						a = a.website.toLowerCase();
  						b = b.website.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
            <Tooltip title="View">
            <Link to={`${match.path}/${elm.id}`}>
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} size="small"/>
            </Link>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {deleteClient(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];

    const content = loading ? <Loading /> : <Table columns={tableColumns} dataSource={clients} rowKey='id' />;

		return (
			<Card bodyStyle={{'padding': '0px'}}>
				{content}
			</Card>
		)
}

export default ClientList
