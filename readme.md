# URL Shortener API Documentation

This API allows users to shorten URLs and retrieve analytics for those shortened URLs.

## Endpoints

### 1. Shorten URL

**POST /url**

* **Request Body:**
	+ `url`: The long URL to be shortened. (Required)
	+ `shortID`: A custom short ID for the URL. (Optional)
* **Response:**
	+ `shortId`: The generated short ID for the URL.
* **Example Request:**
```json
{
  "url": "https://www.example.com/very/long/url",
  "shortID": "custom-id"
}
```
* **Example Response:**
```json
{
  "shortId": "generated-short-id"
}

### 2. Get Analytics

**GET /url/analytics/:shortId**

* **Path Parameters:**
	+ `shortId`: The short ID of the URL for which to retrieve analytics.
* **Response:**
	+ `totalClicks`: The total number of clicks on the shortened URL.
	+ `analytics`: An array of visit history, including timestamps.
* **Example Response:**
```json
{
  "totalClicks": 10,
  "analytics": [
    { "timeStamp": 1622548800 },
    { "timeStamp": 1622552400 },
    ...
  ]
}
```

## Error Handling

* If the request is invalid or fails, the API will return a JSON response with an `error` property containing a descriptive error message.
* Example error response:
```json
{
  "error": "url is required"
}
