



<!-- PROJECT SHIELDS -->

<br />


<h1 align="center">Chatbot NW</h1>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Chatbot build on Restify, Typescript and Socket.IO that utilizes intent recognition by using OpenAI API. Additionally the workflow of the chatbot can be configured by uploading JSON configuration file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)][Mongodb-uri]
* [![Restify](https://img.shields.io/badge/Restify-000000?style=for-the-badge&logo=restify&logoColor=white)][Restify-url]
* [![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)][Jest-uri]
* [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)][Typescript-uri]
* [![Socket.io](https://img.shields.io/badge/Socket.io-010101)][Socketio-uri]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

1. Get OpenAI API Key at [OpenAI API](https://platform.openai.com/api-keys)
   
2. Clone the repo
   
   ```sh
   git clone https://github.com/shadjipasev/chatbot_nw
   ```
   
3. Install NPM packages
   
   ```sh
   npm install
   ```
   
4. Add below variables in `.env`
   ```js
   MONGO_URI=mongodb://localhost:27017/chatbot-nw
   OPENAI_API_KEY = 'ENTER YOUR API';
   ```

 4. Start application
   ```js
   npm start
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Create configuration file (`for example use` [example-chat-config.json](https://github.com/shadjipasev/chatbot_nw/blob/main/example-chat-config.json))

  ```js
POST/config
   ```

Retrieve latest configuration

  ```js
GET/config
   ```

Retrieve history by id

  ```js
GET/history/:id
   ```


## Docker

 ```sh
docker compose up --build
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Restify-url]: https://restify.com/docs/request-api/
[Typescript-uri]: https://www.typescriptlang.org/
[Socketio-uri]: https://socket.io/
[Mongodb-uri]: https://www.mongodb.com/
[Jest-uri]: https://jestjs.io/

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
