# Postman Collection URL
```
https://www.getpostman.com/collections/a67e7c1b7262bc00a0ac
```

# Sample API Request 
REST API to the app is described below.

* ##  Get Invoices

<!-- Get all invoice data, total profit, and total cash transaction, with or without filter -->

### Request
```http
GET /invoices/?date=02/09/2022&size=12&page=1
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `date` | `string` | **Optional**. Filter base on invoice's date with format *dd/mm/yyyy* |
| `size` | `string` | **Optional**. Set size of each page with default value is 10 |
| `page` | `string` | **Optional**. Set Invoices page |

### Response 
```json
{
    "status": true,
    "message": "invoice list",
    "data": {
        "totalCash": 91500,
        "totalProfit": 28500,
        "list": [
            {
                "id": 2,
                "date": "2022-09-01T17:00:00.000Z",
                "customerName": "buyer2",
                "salespersonName": "sales1",
                "paymentType": "CREDIT",
                "notes": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.",
                "createdAt": "2022-09-01T09:51:56.846Z",
                "updatedAt": "2022-09-01T09:51:56.846Z",
                "products": [
                    {
                        "id": 2,
                        "itemName": "product2",
                        "quantity": 2,
                        "totalCogs": "63000",
                        "totalPrice": "91500",
                        "invoiceId": 2,
                        "createdAt": "2022-09-01T09:51:56.859Z",
                        "updatedAt": "2022-09-01T09:51:56.859Z"
                    },
                ]
            }
        ]
    }
}
```

* ## Create Invoice

### Request
```http
POST /invoices
```
### Body
| Attribute | Type | Description |
| :--- | :--- | :--- |
| date | `string` | **Required**.  Valid date with format *dd/mm/yyyy* |
| salespersonName | `string` | **Required** |
| customerName | `string` | **Required** |
| paymentType | `string` | **Required**. *CASH* or *CREDIT* |
| notes | `string` | **Optional** |
| products | `Array`| **Required**. Array of product object with minimun length of 1|
| products.itemName | `string`| **Required**|
| products.quantity | `number`| **Required**|
| products.totalCogs | `number`| **Required**|
| products.totalPrice | `number`| **Required**|

```json
{
    "date": "31/08/2022",
    "salespersonName": "naufal",
    "customerName": "hanan",
    "paymentType":"CASH",
    "products": [
        {
            "itemName":"sasas",
            "quantity": 5,
            "totalCogs": 45000,
            "totalPrice": 50000
        },
        {
            "itemName":"sasas",
            "quantity": 5,
            "totalCogs": 45000,
            "totalPrice": 50000
        }
    ]
}
```
### Response 
```json
{
    "status": true,
    "message": "create success",
    "data": {
        "id": 4,
        "date": "2022-08-30T17:00:00.000Z",
        "salespersonName": "naufal",
        "customerName": "hanan",
        "paymentType": "CASH",
        "products": [
            {
                "id": 16,
                "itemName": "sasas",
                "quantity": 5,
                "totalCogs": "45000",
                "totalPrice": "50000",
                "invoiceId": 4,
                "updatedAt": "2022-09-01T10:06:58.344Z",
                "createdAt": "2022-09-01T10:06:58.344Z"
            },
            {
                "id": 17,
                "itemName": "sasas",
                "quantity": 5,
                "totalCogs": "45000",
                "totalPrice": "50000",
                "invoiceId": 4,
                "updatedAt": "2022-09-01T10:06:58.344Z",
                "createdAt": "2022-09-01T10:06:58.344Z"
            }
        ],
        "updatedAt": "2022-09-01T10:06:58.268Z",
        "createdAt": "2022-09-01T10:06:58.268Z",
        "notes": null
    }
}
```

* ## Update Invoice
### Request
```http
PUT /invoices/{:invoiceId}
```
### Body
| Attribute | Type | Description |
| :--- | :--- | :--- |
| date | `string` | **Optional**. Valid date with format *dd/mm/yyyy* |
| salespersonName | `string` | **Optional** |
| customerName | `string` | **Optional** |
| paymentType | `string` | **Optional**. *CASH* or *CREDIT* |
| notes | `string` | **Optional** |
```json
{
    "customerName":"new name",
    "paymentType": "CREDIT",
    "notes": "lorem ipsum"
}
```
### Response 
```json
{
    "status": true,
    "message": "update success",
    "data": {
        "id": 4,
        "date": "2022-08-30T17:00:00.000Z",
        "salespersonName": "naufal",
        "customerName": "new name",
        "paymentType": "CREDIT",
        "products": [
            {
                "id": 16,
                "itemName": "sasas",
                "quantity": 5,
                "totalCogs": "45000",
                "totalPrice": "50000",
                "invoiceId": 4,
                "updatedAt": "2022-09-01T10:06:58.344Z",
                "createdAt": "2022-09-01T10:06:58.344Z"
            },
            {
                "id": 17,
                "itemName": "sasas",
                "quantity": 5,
                "totalCogs": "45000",
                "totalPrice": "50000",
                "invoiceId": 4,
                "updatedAt": "2022-09-01T10:06:58.344Z",
                "createdAt": "2022-09-01T10:06:58.344Z"
            }
        ],
        "updatedAt": "2022-09-01T10:06:58.268Z",
        "createdAt": "2022-09-01T10:06:58.268Z",
    	"notes": "lorem ipsum"
    }
}
```

* ## Delete Invoice
### Request
```http
DELETE /invoices/{:invoiceId}
```
### Response 
```json
{
    "status": true,
    "message": "delete success",
    "data": null
}
```

* ## Upload XLSX
### Request
```http
POST /invoices/upload-xlsx
```
### Body 
| Attribute | Type | Description |
| :--- | :--- | :--- |
| file | `file` | **Optional**. Valid xlsx file in formdata |
### Response 
```json
{
    "status": true,
    "message": [
        {
            "sheet": "invoice",
            "errors": [
                {
                    "row": 7,
                    "message": "Duplicate data on invoice with invoice no 2"
                },
                {
                    "row": 9,
                    "message": "Duplicate data on invoice with invoice no 4"
                },
                {
                    "row": 5,
                    "message": "Invalid data from invoice no 4. payment type must be one of the following values: CASH, CREDIT"
                },
                {
                    "row": 6,
                    "message": "Invalid data from invoice no 5. salesperson is a required field"
                }
            ]
        },
        {
            "sheet": "product sold",
            "errors": [
                {
                    "row": 6,
                    "message": "Invalid invoice no. Invoice with no 7 doesn't exist on the invoice sheet"
                },
                {
                    "row": 11,
                    "message": "Invalid data. total cogs is a required field"
                },
                {
                    "row": 7,
                    "message": "Invalid data on invoice sheet. With invoice no 4"
                },
                {
                    "row": 8,
                    "message": "Invalid data on invoice sheet. With invoice no 5"
                }
            ]
        }
    ],
    "data": [
        {
            "id": 10,
            "date": "2020-12-31T17:00:00.000Z",
            "customerName": "John",
            "salespersonName": "Doe",
            "paymentType": "CASH",
            "notes": "Lorem ipsum",
            "products": [
                {
                    "id": 15,
                    "itemName": "Bluetooth speaker",
                    "quantity": 3,
                    "totalCogs": "630000",
                    "totalPrice": "756000",
                    "invoiceId": 10,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                },
                {
                    "id": 16,
                    "itemName": "Headphone",
                    "quantity": 8,
                    "totalCogs": "400000",
                    "totalPrice": "480000",
                    "invoiceId": 10,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                }
            ],
            "createdAt": "2022-09-01T09:45:41.020Z",
            "updatedAt": "2022-09-01T09:45:41.020Z"
        },
        {
            "id": 11,
            "date": "2020-12-31T17:00:00.000Z",
            "customerName": "John",
            "salespersonName": "Doe",
            "paymentType": "CASH",
            "notes": "Lorem ipsum",
            "products": [
                {
                    "id": 17,
                    "itemName": "Laptop charger",
                    "quantity": 4,
                    "totalCogs": "800000",
                    "totalPrice": "960000",
                    "invoiceId": 11,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                }
            ],
            "createdAt": "2022-09-01T09:45:41.020Z",
            "updatedAt": "2022-09-01T09:45:41.020Z"
        },
        {
            "id": 12,
            "date": "2021-01-02T17:00:00.000Z",
            "customerName": "Jane",
            "salespersonName": "Doe",
            "paymentType": "CREDIT",
            "notes": "Lorem ipsum",
            "products": [
                {
                    "id": 18,
                    "itemName": "LCD Monitor",
                    "quantity": 1,
                    "totalCogs": "500000",
                    "totalPrice": "600000",
                    "invoiceId": 12,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                },
                {
                    "id": 19,
                    "itemName": "Bluetooth speaker",
                    "quantity": 1,
                    "totalCogs": "210000",
                    "totalPrice": "252000",
                    "invoiceId": 12,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                }
            ],
            "createdAt": "2022-09-01T09:45:41.020Z",
            "updatedAt": "2022-09-01T09:45:41.020Z"
        },
        {
            "id": 13,
            "date": "2021-01-04T17:00:00.000Z",
            "customerName": "Jeff",
            "salespersonName": "Pete",
            "paymentType": "CREDIT",
            "notes": "Lorem ipsum",
            "products": [
                {
                    "id": 20,
                    "itemName": "Bluetooth speaker",
                    "quantity": 1,
                    "totalCogs": "210000",
                    "totalPrice": "252000",
                    "invoiceId": 13,
                    "createdAt": "2022-09-01T09:45:41.020Z",
                    "updatedAt": "2022-09-01T09:45:41.020Z"
                }
            ],
            "createdAt": "2022-09-01T09:45:41.020Z",
            "updatedAt": "2022-09-01T09:45:41.020Z"
        }
    ]
}
```

# Postman collection v2.1 JSON
```json
{
	"info": {
		"_postman_id": "10e91174-0db6-4dbb-84ed-46f8be9f413f",
		"name": "wida-tech",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "14389015"
	},
	"item": [
		{
			"name": "read",
			"event": [
				{
					"listen": "prerequest",
					"script": {
						"exec": [
							""
						],
						"type": "text/javascript"
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3030/invoices?date=02/09/2022&size=12&page=1",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"invoices"
					],
					"query": [
						{
							"key": "date",
							"value": "02/09/2022"
						},
						{
							"key": "size",
							"value": "12"
						},
						{
							"key": "page",
							"value": "1"
						}
					]
				}
			},
			"response": [
				{
					"name": "success",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices?date=01/09/2022&size=12&page=1",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices"
							],
							"query": [
								{
									"key": "date",
									"value": "01/09/2022"
								},
								{
									"key": "size",
									"value": "12"
								},
								{
									"key": "page",
									"value": "1"
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "2460"
						},
						{
							"key": "ETag",
							"value": "W/\"99c-utYWFGNfOgIG21iKcsVCCEID0Tk\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:05:36 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"message\": \"invoice list\",\n    \"data\": {\n        \"totalCash\": 4621500,\n        \"totalProfit\": 526500,\n        \"list\": [\n            {\n                \"id\": 3,\n                \"date\": \"2022-08-31T17:00:00.000Z\",\n                \"customerName\": \"buyer3\",\n                \"salespersonName\": \"sales2\",\n                \"paymentType\": \"CASH\",\n                \"notes\": \"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.\",\n                \"createdAt\": \"2022-09-01T09:51:56.846Z\",\n                \"updatedAt\": \"2022-09-01T09:51:56.846Z\",\n                \"products\": [\n                    {\n                        \"id\": 1,\n                        \"itemName\": \"product1\",\n                        \"quantity\": 2,\n                        \"totalCogs\": \"98000\",\n                        \"totalPrice\": \"116000\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 4,\n                        \"itemName\": \"product4\",\n                        \"quantity\": 5,\n                        \"totalCogs\": \"28000\",\n                        \"totalPrice\": \"44500\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 7,\n                        \"itemName\": \"product7\",\n                        \"quantity\": 1,\n                        \"totalCogs\": \"70000\",\n                        \"totalPrice\": \"98500\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 8,\n                        \"itemName\": \"product8\",\n                        \"quantity\": 9,\n                        \"totalCogs\": \"98000\",\n                        \"totalPrice\": \"117500\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 10,\n                        \"itemName\": \"product10\",\n                        \"quantity\": 9,\n                        \"totalCogs\": \"133000\",\n                        \"totalPrice\": \"137500\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 11,\n                        \"itemName\": \"product11\",\n                        \"quantity\": 1,\n                        \"totalCogs\": \"98000\",\n                        \"totalPrice\": \"113000\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 13,\n                        \"itemName\": \"product13\",\n                        \"quantity\": 7,\n                        \"totalCogs\": \"28000\",\n                        \"totalPrice\": \"34000\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 14,\n                        \"itemName\": \"product14\",\n                        \"quantity\": 2,\n                        \"totalCogs\": \"133000\",\n                        \"totalPrice\": \"155500\",\n                        \"invoiceId\": 3,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    }\n                ]\n            },\n            {\n                \"id\": 1,\n                \"date\": \"2022-08-31T17:00:00.000Z\",\n                \"customerName\": \"buyer1\",\n                \"salespersonName\": \"sales1\",\n                \"paymentType\": \"CASH\",\n                \"notes\": \"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, rem.\",\n                \"createdAt\": \"2022-09-01T09:51:56.846Z\",\n                \"updatedAt\": \"2022-09-01T09:51:56.846Z\",\n                \"products\": [\n                    {\n                        \"id\": 6,\n                        \"itemName\": \"product6\",\n                        \"quantity\": 2,\n                        \"totalCogs\": \"35000\",\n                        \"totalPrice\": \"50000\",\n                        \"invoiceId\": 1,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    },\n                    {\n                        \"id\": 15,\n                        \"itemName\": \"product15\",\n                        \"quantity\": 7,\n                        \"totalCogs\": \"140000\",\n                        \"totalPrice\": \"144500\",\n                        \"invoiceId\": 1,\n                        \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                        \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n                    }\n                ]\n            }\n        ]\n    }\n}"
				}
			]
		},
		{
			"name": "create",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"315/08/2022\",\r\n    \"salespersonName\": \"n\",\r\n    \"paymentType\":\"CASHH\",\r\n    \"products\": [\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"totalCogs\": 40,\r\n            \"totalPrice\": 50000\r\n        },\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"quantity\": 5,\r\n            \"totalCogs\": 45000,\r\n            \"totalPrice\": 50000\r\n        }\r\n    ]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3030/invoices",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"invoices"
					]
				}
			},
			"response": [
				{
					"name": "success",
					"originalRequest": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"date\": \"31/08/2022\",\r\n    \"salespersonName\": \"naufal\",\r\n    \"customerName\": \"hanan\",\r\n    \"paymentType\":\"CASH\",\r\n    \"products\": [\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"quantity\": 5,\r\n            \"totalCogs\": 45000,\r\n            \"totalPrice\": 50000\r\n        },\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"quantity\": 5,\r\n            \"totalCogs\": 45000,\r\n            \"totalPrice\": 50000\r\n        }\r\n    ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices"
							]
						}
					},
					"status": "Created",
					"code": 201,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "617"
						},
						{
							"key": "ETag",
							"value": "W/\"269-SIUFaXYfiFj0shCy4HbAZDOXNnA\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:06:58 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"message\": \"create success\",\n    \"data\": {\n        \"id\": 4,\n        \"date\": \"2022-08-30T17:00:00.000Z\",\n        \"salespersonName\": \"naufal\",\n        \"customerName\": \"hanan\",\n        \"paymentType\": \"CASH\",\n        \"products\": [\n            {\n                \"id\": 16,\n                \"itemName\": \"sasas\",\n                \"quantity\": 5,\n                \"totalCogs\": \"45000\",\n                \"totalPrice\": \"50000\",\n                \"invoiceId\": 4,\n                \"updatedAt\": \"2022-09-01T10:06:58.344Z\",\n                \"createdAt\": \"2022-09-01T10:06:58.344Z\"\n            },\n            {\n                \"id\": 17,\n                \"itemName\": \"sasas\",\n                \"quantity\": 5,\n                \"totalCogs\": \"45000\",\n                \"totalPrice\": \"50000\",\n                \"invoiceId\": 4,\n                \"updatedAt\": \"2022-09-01T10:06:58.344Z\",\n                \"createdAt\": \"2022-09-01T10:06:58.344Z\"\n            }\n        ],\n        \"updatedAt\": \"2022-09-01T10:06:58.268Z\",\n        \"createdAt\": \"2022-09-01T10:06:58.268Z\",\n        \"notes\": null\n    }\n}"
				},
				{
					"name": "failed 422",
					"originalRequest": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"date\": \"315/08/2022\",\r\n    \"salespersonName\": \"n\",\r\n    \"paymentType\":\"CASHH\",\r\n    \"products\": [\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"totalCogs\": 40,\r\n            \"totalPrice\": 50000\r\n        },\r\n        {\r\n            \"itemName\":\"sasas\",\r\n            \"quantity\": 5,\r\n            \"totalCogs\": 45000,\r\n            \"totalPrice\": 50000\r\n        }\r\n    ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices"
							]
						}
					},
					"status": "Unprocessable Entity",
					"code": 422,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "380"
						},
						{
							"key": "ETag",
							"value": "W/\"17c-Dnb+XaSsHMkxsmB/rd8UMa5rlhc\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:08:49 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": false,\n    \"message\": [\n        {\n            \"path\": \"customerName\",\n            \"errors\": [\n                \"customerName is a required field\"\n            ]\n        },\n        {\n            \"path\": \"salespersonName\",\n            \"errors\": [\n                \"salespersonName must be at least 2 characters\"\n            ]\n        },\n        {\n            \"path\": \"paymentType\",\n            \"errors\": [\n                \"paymentType must be one of the following values: CASH, CREDIT\"\n            ]\n        },\n        {\n            \"path\": \"products[0].quantity\",\n            \"errors\": [\n                \"products[0].quantity is a required field\"\n            ]\n        }\n    ],\n    \"data\": null\n}"
				}
			]
		},
		{
			"name": "update",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"date\": \"21/08/2022\",\r\n    \"customerName\":\"new name\",\r\n    \"paymentType\": \"CREDIT\",\r\n    \"notes\": \"lorem ipsum\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3030/invoices/1",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"invoices",
						"1"
					]
				}
			},
			"response": [
				{
					"name": "success",
					"originalRequest": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"customerName\":\"new name\",\r\n    \"paymentType\": \"CREDIT\",\r\n    \"notes\": \"lorem ipsum\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices/1",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"1"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "639"
						},
						{
							"key": "ETag",
							"value": "W/\"27f-3ZyAa+e9f0OLgqyUxEP54MtH5Vc\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:09:37 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"message\": \"update success\",\n    \"data\": {\n        \"id\": 1,\n        \"date\": \"2022-08-31T17:00:00.000Z\",\n        \"customerName\": \"new name\",\n        \"salespersonName\": \"sales1\",\n        \"paymentType\": \"CREDIT\",\n        \"notes\": \"lorem ipsum\",\n        \"createdAt\": \"2022-09-01T09:51:56.846Z\",\n        \"updatedAt\": \"2022-09-01T10:09:37.886Z\",\n        \"products\": [\n            {\n                \"id\": 6,\n                \"itemName\": \"product6\",\n                \"quantity\": 2,\n                \"totalCogs\": \"35000\",\n                \"totalPrice\": \"50000\",\n                \"invoiceId\": 1,\n                \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n            },\n            {\n                \"id\": 15,\n                \"itemName\": \"product15\",\n                \"quantity\": 7,\n                \"totalCogs\": \"140000\",\n                \"totalPrice\": \"144500\",\n                \"invoiceId\": 1,\n                \"createdAt\": \"2022-09-01T09:51:56.859Z\",\n                \"updatedAt\": \"2022-09-01T09:51:56.859Z\"\n            }\n        ]\n    }\n}"
				},
				{
					"name": "failed 422",
					"originalRequest": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"customerName\":\"n\",\r\n    \"paymentType\": \"CREDIIT\",\r\n    \"notes\": \"lorem ipsum\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices/1",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"1"
							]
						}
					},
					"status": "Unprocessable Entity",
					"code": 422,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "218"
						},
						{
							"key": "ETag",
							"value": "W/\"da-AzCW92tal5xVTXMReMLkq/Ky1wo\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:10:21 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": false,\n    \"message\": [\n        {\n            \"path\": \"customerName\",\n            \"errors\": [\n                \"customerName must be at least 2 characters\"\n            ]\n        },\n        {\n            \"path\": \"paymentType\",\n            \"errors\": [\n                \"paymentType must be one of the following values: CASH, CREDIT\"\n            ]\n        }\n    ],\n    \"data\": null\n}"
				},
				{
					"name": "failed 404",
					"originalRequest": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"customerName\":\"new name\",\r\n    \"paymentType\": \"CREDIT\",\r\n    \"notes\": \"lorem ipsum\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3030/invoices/123232",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"123232"
							]
						}
					},
					"status": "Not Found",
					"code": 404,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "73"
						},
						{
							"key": "ETag",
							"value": "W/\"49-3CAH3dLUGXz5C0LopdbAS+qgJVY\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:11:28 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": false,\n    \"message\": \"Invoice with ID 123232 Not Found\",\n    \"data\": null\n}"
				}
			]
		},
		{
			"name": "delete",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:3030/invoices/1",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"invoices",
						"1"
					]
				}
			},
			"response": [
				{
					"name": "success",
					"originalRequest": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3030/invoices/3",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"3"
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "54"
						},
						{
							"key": "ETag",
							"value": "W/\"36-c09i03LfKxs+vnwba3/s3SFWrHQ\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:11:58 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"message\": \"delete success\",\n    \"data\": null\n}"
				},
				{
					"name": "failed 404",
					"originalRequest": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3030/invoices/233",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"233"
							]
						}
					},
					"status": "Not Found",
					"code": 404,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "69"
						},
						{
							"key": "ETag",
							"value": "W/\"45-+EJayZr5clh2La0qKvO6L3C5RV0\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 10:12:26 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": false,\n    \"message\": \"Invoie with ID 233 Not Found\",\n    \"data\": null\n}"
				}
			]
		},
		{
			"name": "xlsx upload",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "file",
							"type": "file",
							"src": "/C:/Users/ACER/Downloads/InvoiceImport (1).xlsx"
						}
					]
				},
				"url": {
					"raw": "localhost:3030/invoices/upload-xlsx",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"invoices",
						"upload-xlsx"
					]
				}
			},
			"response": [
				{
					"name": "success",
					"originalRequest": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "file",
									"type": "file",
									"src": "/C:/Users/ACER/Downloads/InvoiceImport (1).xlsx"
								}
							]
						},
						"url": {
							"raw": "localhost:3030/invoices/upload-xlsx",
							"host": [
								"localhost"
							],
							"port": "3030",
							"path": [
								"invoices",
								"upload-xlsx"
							]
						}
					},
					"status": "Multi-Status",
					"code": 207,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "2767"
						},
						{
							"key": "ETag",
							"value": "W/\"acf-Qqqw8uusveaj3k0vHC3XGQXF7V0\""
						},
						{
							"key": "Date",
							"value": "Thu, 01 Sep 2022 09:45:41 GMT"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "Keep-Alive",
							"value": "timeout=5"
						}
					],
					"cookie": [],
					"body": "{\n    \"status\": true,\n    \"message\": [\n        {\n            \"sheet\": \"invoice\",\n            \"errors\": [\n                {\n                    \"row\": 7,\n                    \"message\": \"Duplicate data on invoice with invoice no 2\"\n                },\n                {\n                    \"row\": 9,\n                    \"message\": \"Duplicate data on invoice with invoice no 4\"\n                },\n                {\n                    \"row\": 5,\n                    \"message\": \"Invalid data from invoice no 4. payment type must be one of the following values: CASH, CREDIT\"\n                },\n                {\n                    \"row\": 6,\n                    \"message\": \"Invalid data from invoice no 5. salesperson is a required field\"\n                }\n            ]\n        },\n        {\n            \"sheet\": \"product sold\",\n            \"errors\": [\n                {\n                    \"row\": 6,\n                    \"message\": \"Invalid invoice no. Invoice with no 7 doesn't exist on the invoice sheet\"\n                },\n                {\n                    \"row\": 11,\n                    \"message\": \"Invalid data. total cogs is a required field\"\n                },\n                {\n                    \"row\": 7,\n                    \"message\": \"Invalid data on invoice sheet. With invoice no 4\"\n                },\n                {\n                    \"row\": 8,\n                    \"message\": \"Invalid data on invoice sheet. With invoice no 5\"\n                }\n            ]\n        }\n    ],\n    \"data\": [\n        {\n            \"id\": 10,\n            \"date\": \"2020-12-31T17:00:00.000Z\",\n            \"customerName\": \"John\",\n            \"salespersonName\": \"Doe\",\n            \"paymentType\": \"CASH\",\n            \"notes\": \"Lorem ipsum\",\n            \"products\": [\n                {\n                    \"id\": 15,\n                    \"itemName\": \"Bluetooth speaker\",\n                    \"quantity\": 3,\n                    \"totalCogs\": \"630000\",\n                    \"totalPrice\": \"756000\",\n                    \"invoiceId\": 10,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                },\n                {\n                    \"id\": 16,\n                    \"itemName\": \"Headphone\",\n                    \"quantity\": 8,\n                    \"totalCogs\": \"400000\",\n                    \"totalPrice\": \"480000\",\n                    \"invoiceId\": 10,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                }\n            ],\n            \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n            \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n        },\n        {\n            \"id\": 11,\n            \"date\": \"2020-12-31T17:00:00.000Z\",\n            \"customerName\": \"John\",\n            \"salespersonName\": \"Doe\",\n            \"paymentType\": \"CASH\",\n            \"notes\": \"Lorem ipsum\",\n            \"products\": [\n                {\n                    \"id\": 17,\n                    \"itemName\": \"Laptop charger\",\n                    \"quantity\": 4,\n                    \"totalCogs\": \"800000\",\n                    \"totalPrice\": \"960000\",\n                    \"invoiceId\": 11,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                }\n            ],\n            \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n            \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n        },\n        {\n            \"id\": 12,\n            \"date\": \"2021-01-02T17:00:00.000Z\",\n            \"customerName\": \"Jane\",\n            \"salespersonName\": \"Doe\",\n            \"paymentType\": \"CREDIT\",\n            \"notes\": \"Lorem ipsum\",\n            \"products\": [\n                {\n                    \"id\": 18,\n                    \"itemName\": \"LCD Monitor\",\n                    \"quantity\": 1,\n                    \"totalCogs\": \"500000\",\n                    \"totalPrice\": \"600000\",\n                    \"invoiceId\": 12,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                },\n                {\n                    \"id\": 19,\n                    \"itemName\": \"Bluetooth speaker\",\n                    \"quantity\": 1,\n                    \"totalCogs\": \"210000\",\n                    \"totalPrice\": \"252000\",\n                    \"invoiceId\": 12,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                }\n            ],\n            \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n            \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n        },\n        {\n            \"id\": 13,\n            \"date\": \"2021-01-04T17:00:00.000Z\",\n            \"customerName\": \"Jeff\",\n            \"salespersonName\": \"Pete\",\n            \"paymentType\": \"CREDIT\",\n            \"notes\": \"Lorem ipsum\",\n            \"products\": [\n                {\n                    \"id\": 20,\n                    \"itemName\": \"Bluetooth speaker\",\n                    \"quantity\": 1,\n                    \"totalCogs\": \"210000\",\n                    \"totalPrice\": \"252000\",\n                    \"invoiceId\": 13,\n                    \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n                    \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n                }\n            ],\n            \"createdAt\": \"2022-09-01T09:45:41.020Z\",\n            \"updatedAt\": \"2022-09-01T09:45:41.020Z\"\n        }\n    ]\n}"
				}
			]
		}
	]
}
```