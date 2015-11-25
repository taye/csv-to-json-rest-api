## Setup

To set up the project, clone it and run `npm install`.

To start the server on port `8080`, run `npm start`.

## Server API

|  endpoint                        | response |
|----------------------------------|----------|
| `/incidents/{id}`                | The incident with the given ID |
| `/incidents/date/{date}`         | All incidents on a certain date. |
| `/incidents/district/{district}` | All incidents for a certain district (eg, TALLAGHT, KILMAINHAM) |
| `/incidents/postcode/{postcode}` | All incidents in a postcode (D4, D2, D7, etc). |

The response is an array of incidents or null if no matching incident is found. For example:

`/incidents/432`

```json
[
  {
    "date": "01-01-2011",
    "agency": "DA",
    "postcode": "D3",
    "district": "CITY CENTRE",
    "toc": "17:54:29",
    "ord": "18:27:04",
    "mob": "18:27:34",
    "ia": "18:31:02",
    "ls": "18:43:00",
    "ah": "18:47:55",
    "mav": "19:15:31",
    "cd": "19:16:16",
    "id": 432
  }
]
```
