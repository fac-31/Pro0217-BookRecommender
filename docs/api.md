---
title: User API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="user-api">User API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

API Documentation for retrieving users

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

<h1 id="user-api-default">Default</h1>

## get__users

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/users \
  -H 'Accept: application/json'

```

```http
GET http://localhost:3000/users HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:3000/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://localhost:3000/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://localhost:3000/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users`

*Get all users*

Retrieve a list of all users

> Example responses

> 200 Response

```json
[
  {
    "username": "john_doe",
    "id": 123,
    "likes": [
      {
        "id": "book123",
        "reason": "Loved the storyline"
      }
    ],
    "dislikes": [
      {
        "id": "book123",
        "reason": "Loved the storyline"
      }
    ],
    "pending": [
      101,
      102
    ],
    "friends": [
      201,
      202
    ],
    "inbox": [
      {
        "id": 1,
        "type": "friend_request"
      }
    ]
  }
]
```

<h3 id="get__users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of users|[Users](#schemausers)|

<aside class="success">
This operation does not require authentication
</aside>

## get__users_{id}

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/users/{id} \
  -H 'Accept: application/json'

```

```http
GET http://localhost:3000/users/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://localhost:3000/users/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://localhost:3000/users/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/users/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/users/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/{id}`

*Get a user by ID*

Retrieve a specific user by their unique ID

<h3 id="get__users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Numeric ID of the user to retrieve|

> Example responses

> 200 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="get__users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The requested user|[User](#schemauser)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|Inline|

<h3 id="get__users_{id}-responseschema">Response Schema</h3>

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__users_add

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/users/add \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/users/add HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "username": "New"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/add',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/users/add',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/users/add', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/users/add', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/add");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/users/add", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/add`

*Add a new user*

Create a new user with a username

> Body parameter

```json
{
  "username": "New"
}
```

<h3 id="post__users_add-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» username|body|string|true|none|

> Example responses

> 201 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="post__users_add-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|User created successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request body|Inline|

<h3 id="post__users_add-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__users_update-book

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/users/update-book \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/users/update-book HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "user_id": 1,
  "book_id": "69",
  "key": "likes",
  "add": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/update-book',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/users/update-book',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/users/update-book', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/users/update-book', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/update-book");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/users/update-book", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/update-book`

*Update a user's book data (likes/dislikes)*

Add or remove a book from a user's `likes` or `dislikes` list

> Body parameter

```json
{
  "user_id": 1,
  "book_id": "69",
  "key": "likes",
  "add": true
}
```

<h3 id="post__users_update-book-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» user_id|body|integer|true|none|
|» book_id|body|string|true|none|
|» key|body|string|true|none|
|» add|body|boolean|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» key|likes|
|» key|dislikes|

> Example responses

> 200 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="post__users_update-book-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's book list updated successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request data|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User or book not found|Inline|

<h3 id="post__users_update-book-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__users_update-pending

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/users/update-pending \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/users/update-pending HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "user_id": 1,
  "friend_id": 2,
  "key": "pending",
  "add": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/update-pending',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/users/update-pending',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/users/update-pending', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/users/update-pending', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/update-pending");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/users/update-pending", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/update-pending`

*Update a user's friends request to pending*

Add or remove a user from a user's pending list

> Body parameter

```json
{
  "user_id": 1,
  "friend_id": 2,
  "key": "pending",
  "add": true
}
```

<h3 id="post__users_update-pending-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» user_id|body|integer|true|none|
|» friend_id|body|integer|true|none|
|» key|body|string|true|none|
|» add|body|boolean|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» key|pending|

> Example responses

> 200 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="post__users_update-pending-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's pending list updated successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request data|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|Inline|

<h3 id="post__users_update-pending-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__users_update-friend

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/users/update-friend \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/users/update-friend HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "user_id": 1,
  "friend_id": 2,
  "key": "friend",
  "add": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/update-friend',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/users/update-friend',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/users/update-friend', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/users/update-friend', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/update-friend");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/users/update-friend", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/update-friend`

*Update a user's friends request to friends*

Add or remove a user from a user's friend list

> Body parameter

```json
{
  "user_id": 1,
  "friend_id": 2,
  "key": "friend",
  "add": true
}
```

<h3 id="post__users_update-friend-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» user_id|body|integer|true|none|
|» friend_id|body|integer|true|none|
|» key|body|string|true|none|
|» add|body|boolean|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» key|friend|

> Example responses

> 200 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="post__users_update-friend-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's friend's list updated successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request data|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|Inline|

<h3 id="post__users_update-friend-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__users_update-inbox

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/users/update-inbox \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/users/update-inbox HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "addressee_id": 1,
  "sender_id": 2,
  "message_type": "request_accepted",
  "key": "inbox",
  "add": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/users/update-inbox',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/users/update-inbox',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/users/update-inbox', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/users/update-inbox', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/users/update-inbox");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/users/update-inbox", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/update-inbox`

*Update a user's inbox*

Add or remove a message from inbox

> Body parameter

```json
{
  "addressee_id": 1,
  "sender_id": 2,
  "message_type": "request_accepted",
  "key": "inbox",
  "add": true
}
```

<h3 id="post__users_update-inbox-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» addressee_id|body|integer|true|none|
|» sender_id|body|integer|true|none|
|» message_type|body|string|true|none|
|» key|body|string|true|none|
|» add|body|boolean|true|none|

> Example responses

> 200 Response

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}
```

<h3 id="post__users_update-inbox-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's inbox updated successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request data|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|Inline|

<h3 id="post__users_update-inbox-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__recommendations

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/recommendations \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/recommendations HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "userPrompt": "I like sad cool books"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/recommendations',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/recommendations',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/recommendations', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/recommendations', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/recommendations");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/recommendations", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /recommendations`

*Get book recommendations based on a user's prompt*

Provide book recommendations based on the user's interest prompt

> Body parameter

```json
{
  "userPrompt": "I like sad cool books"
}
```

<h3 id="post__recommendations-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» userPrompt|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "books": [
    {
      "id": "_dkvAAAAMAAJ",
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": "1813",
      "cover": "https://example.com/cover.jpg",
      "reason_for_recommendation": "A classic romance novel with timeless themes"
    }
  ]
}
```

<h3 id="post__recommendations-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of books corresponding to the given IDs|[Books](#schemabooks)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid user prompt|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|Inline|

<h3 id="post__recommendations-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__recommendations_byUserPreferences_{id}

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/recommendations/byUserPreferences/{id} \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/recommendations/byUserPreferences/{id} HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://localhost:3000/recommendations/byUserPreferences/{id}',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/recommendations/byUserPreferences/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/recommendations/byUserPreferences/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/recommendations/byUserPreferences/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/recommendations/byUserPreferences/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/recommendations/byUserPreferences/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /recommendations/byUserPreferences/{id}`

*Get book recommendations based on a user's preferences (using user ID)*

Provide book recommendations based on the stored preferences of a user identified by the ID

<h3 id="post__recommendations_byuserpreferences_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Numeric ID of the user whose preferences are used for recommendations|

> Example responses

> 200 Response

```json
{
  "books": [
    {
      "id": "_dkvAAAAMAAJ",
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": "1813",
      "cover": "https://example.com/cover.jpg",
      "reason_for_recommendation": "A classic romance novel with timeless themes"
    }
  ]
}
```

<h3 id="post__recommendations_byuserpreferences_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of books corresponding to the given IDs|[Books](#schemabooks)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|User not found|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|Inline|

<h3 id="post__recommendations_byuserpreferences_{id}-responseschema">Response Schema</h3>

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__books_fetchBooksByIDs

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/books/fetchBooksByIDs \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST http://localhost:3000/books/fetchBooksByIDs HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "ids": [
    "_dkvAAAAMAAJ",
    "b5XJTggrslgC",
    "CEQU4psAbCMC"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:3000/books/fetchBooksByIDs',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'http://localhost:3000/books/fetchBooksByIDs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('http://localhost:3000/books/fetchBooksByIDs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/books/fetchBooksByIDs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/books/fetchBooksByIDs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/books/fetchBooksByIDs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /books/fetchBooksByIDs`

*Fetch books by IDs*

Retrieve a list of books by providing an array of book IDs

> Body parameter

```json
{
  "ids": [
    "_dkvAAAAMAAJ",
    "b5XJTggrslgC",
    "CEQU4psAbCMC"
  ]
}
```

<h3 id="post__books_fetchbooksbyids-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» ids|body|[string]|true|none|

> Example responses

> 200 Response

```json
{
  "books": [
    {
      "id": "_dkvAAAAMAAJ",
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": "1813",
      "cover": "https://example.com/cover.jpg",
      "reason_for_recommendation": "A classic romance novel with timeless themes"
    }
  ]
}
```

<h3 id="post__books_fetchbooksbyids-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of books corresponding to the given IDs|[Books](#schemabooks)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid request body|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|One or more books not found|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|Inline|

<h3 id="post__books_fetchbooksbyids-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **500**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_BookUserData">BookUserData</h2>
<!-- backwards compatibility -->
<a id="schemabookuserdata"></a>
<a id="schema_BookUserData"></a>
<a id="tocSbookuserdata"></a>
<a id="tocsbookuserdata"></a>

```json
{
  "id": "book123",
  "reason": "Loved the storyline"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|reason|string|false|none|none|

<h2 id="tocS_Message">Message</h2>
<!-- backwards compatibility -->
<a id="schemamessage"></a>
<a id="schema_Message"></a>
<a id="tocSmessage"></a>
<a id="tocsmessage"></a>

```json
{
  "id": 1,
  "type": "friend_request"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|type|string|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "username": "john_doe",
  "id": 123,
  "likes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "dislikes": [
    {
      "id": "book123",
      "reason": "Loved the storyline"
    }
  ],
  "pending": [
    101,
    102
  ],
  "friends": [
    201,
    202
  ],
  "inbox": [
    {
      "id": 1,
      "type": "friend_request"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|false|none|none|
|id|integer|false|none|none|
|likes|[[BookUserData](#schemabookuserdata)]|false|none|none|
|dislikes|[[BookUserData](#schemabookuserdata)]|false|none|none|
|pending|[integer]|false|none|none|
|friends|[integer]|false|none|none|
|inbox|[[Message](#schemamessage)]|false|none|none|

<h2 id="tocS_Users">Users</h2>
<!-- backwards compatibility -->
<a id="schemausers"></a>
<a id="schema_Users"></a>
<a id="tocSusers"></a>
<a id="tocsusers"></a>

```json
[
  {
    "username": "john_doe",
    "id": 123,
    "likes": [
      {
        "id": "book123",
        "reason": "Loved the storyline"
      }
    ],
    "dislikes": [
      {
        "id": "book123",
        "reason": "Loved the storyline"
      }
    ],
    "pending": [
      101,
      102
    ],
    "friends": [
      201,
      202
    ],
    "inbox": [
      {
        "id": 1,
        "type": "friend_request"
      }
    ]
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|

<h2 id="tocS_Book">Book</h2>
<!-- backwards compatibility -->
<a id="schemabook"></a>
<a id="schema_Book"></a>
<a id="tocSbook"></a>
<a id="tocsbook"></a>

```json
{
  "id": "_dkvAAAAMAAJ",
  "title": "Pride and Prejudice",
  "author": "Jane Austen",
  "year": "1813",
  "cover": "https://example.com/cover.jpg",
  "reason_for_recommendation": "A classic romance novel with timeless themes"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|title|string|false|none|none|
|author|string|false|none|none|
|year|string|false|none|none|
|cover|string|false|none|none|
|reason_for_recommendation|string|false|none|none|

<h2 id="tocS_Books">Books</h2>
<!-- backwards compatibility -->
<a id="schemabooks"></a>
<a id="schema_Books"></a>
<a id="tocSbooks"></a>
<a id="tocsbooks"></a>

```json
{
  "books": [
    {
      "id": "_dkvAAAAMAAJ",
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": "1813",
      "cover": "https://example.com/cover.jpg",
      "reason_for_recommendation": "A classic romance novel with timeless themes"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|books|[[Book](#schemabook)]|false|none|none|

