To set up the project, clone it and run `npm install`.

To start the server on port `8080`, run `npm start`.


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
    "date": "02-01-2012 17:43",
    "agency": "Donnybrook",
    "postcode": "Charlie",
    "district": "02/01/2012 17:43",
    "toc": "02/01/2012 17:47",
    "ord": "02/01/2012 17:49",
    "mob": "02/01/2012 18:03",
    "ia": "02/01/2012 18:03",
    "ls": "02/01/2012 18:24",
    "ah": "02/01/2012 18:30",
    "mav": "02/01/2012 18:31",
    "id": 432
  }
]
```
