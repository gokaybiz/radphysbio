<div align="center">
<h1 align="center">RadPhysBio</h1>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/Sass-CC6699.svg?style&logo=Sass&logoColor=white" alt="Sass" />
<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style&logo=vuedotjs&logoColor=white" alt="Vue.js" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/languages/top/gokaybiz/radphysbio?style&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/gokaybiz/radphysbio?style&color=5D6D7E" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/commit-activity/m/gokaybiz/radphysbio?style&color=5D6D7E" alt="GitHub commit activity" />
</div>

---

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Modules](#modules)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running radphysbio](#running-radphysbio)

---


## Overview

The project is a Vue.js application using the Nuxt.js framework, focused on radiation biology and physics. It provides a web interface for users to view and interact with tabular data related to radiation. The core functionalities include filtering, sorting, pagination, and exporting data in various formats. The project aims to provide a user-friendly and efficient way to explore and analyze radiation-related data, enhancing research in the field.


## Features

| Feature            | Description |
|--------------------|-------------|
| **Architecture**   | The codebase follows a component-based architecture using the Vue.js framework. The application is built with Nuxt.js, a universal Vue.js framework that provides server-side rendering, code-splitting, and routing out of the box. This architecture promotes the separation of concerns and allows for code reusability. |
| **Dependencies**   | The system relies on several external libraries and frameworks, including Nuxt.js, Vue.js, Dexie (IndexedDB wrapper), xlsx-js for dynamic excel file generation and Tailwind CSS. These dependencies provide functionality for server-side rendering, database management, front-end development, and styling. |
| **Modularity**     | The codebase demonstrates good modularity by organizing components, layouts, pages, and assets into separate directories. Each component focuses on a specific functionality, making it easier to understand, maintain, and enhance the system. The usage of Vue.js components and Nuxt.js modules contributes to modularity and reusability. |
| **Performance**    | The system leverages server-side rendering provided by Nuxt.js, which helps with initial page load time and enhances SEO. Furthermore, the codebase utilizes efficient data management with IndexedDB and Dexie, enabling fast data retrieval and handling.|
| **Integrations**   | The system integrates with various tools and technologies. Notable integrations include the use of Dexie and IndexedDB for data storage and retrieval,

---


## Repository Structure

```sh
└── radphysbio/
    ├── .eslintrc
    ├── .gitignore
    ├── .npmrc
    ├── .prettierrc
    ├── README.md
    ├── app.vue
    ├── assets/
    │   ├── database/
    │   │   ├── actions/
    │   │   │   ├── converter.ts
    │   │   │   ├── data.ts
    │   │   │   └── metadata.ts
    │   │   └── index.ts
    │   └── workers/
    │       └── dataworker.ts
    ├── components/
    │   ├── Export.vue
    │   ├── Filter/
    │   │   └── index.vue
    │   ├── Footer.vue
    │   ├── Navbar.vue
    │   ├── PageSize.vue
    │   ├── Pagination.vue
    │   ├── ShowMore.vue
    │   └── Table/
    │       ├── Columns/
    │       │   └── index.vue
    │       ├── Rows/
    │       │   └── index.vue
    │       └── index.vue
    ├── error.vue
    ├── layouts/
    │   ├── 404.vue
    │   └── Default.vue
    ├── nuxt.config.ts
    ├── package.json
    ├── pages/
    │   ├── about.vue
    │   └── index.vue
    ├── public/
    │   └── favicon.ico
    ├── server/
    │   ├── middleware/
    │   │   └── checkHeader.ts
    │   └── tsconfig.json
    ├── services/
    │   └── WorkerService.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

## Modules

<details closed><summary>Root</summary>

| File                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                    | ---                                                                                                                                                                                                                                                                                                                                                            |
| [.eslintrc](https://github.com//blob/main/.eslintrc)                   | This code sets up ESLint configurations for a TypeScript-based Nuxt.js project. It extends the default rules defined in the "@nuxtjs/eslint-config-typescript" package, enabling consistent coding standards and automatic code styling checks during development.                                                                                             |
| [.npmrc](https://github.com//blob/main/.npmrc)                         | The code sets the "shamefully-hoist" flag to true in the.npmrc file. This flag allows packages to be hoisted, or moved higher up in the dependency tree, optimizing the package installation process in a Node.js project.                                                                                                                                     |
| [app.vue](https://github.com//blob/main/app.vue)                       | The code is a Vue component that sets up the layout for a Nuxt.js application. It includes a template with a NuxtLayout component that wraps around the NuxtPage component. This structure helps define the overall layout and structure of the web page.                                                                                                      |
| [error.vue](https://github.com//blob/main/error.vue)                   | The "error.vue" code defines a template for a 404 error page. It displays a radiation alert message, along with a visual representation of radiation. It also includes a button to return to safety. The code sets the page title and meta tags for SEO purposes and provides a function to navigate back to the homepage.                                     |
| [nuxt.config.ts](https://github.com//blob/main/nuxt.config.ts)         | This code sets up the configuration for a Vue.js project using Nuxt.js framework. It enables devtools, applies various modules including fontaine, critters, google-fonts, tailwindcss, and nitro. It also configures the postcss plugins and defines app-specific settings such as head, rootId, and baseURL. Lastly, it specifies runtimeConfig for the app. |
| [tailwind.config.ts](https://github.com//blob/main/tailwind.config.ts) | The code defines the configuration for the Tailwind CSS framework. It specifies the files to be processed, extends the theme with additional colors and min-heights, and enables dark mode. This configuration satisfies the `Config` type from the Tailwind CSS library.                                                                                      |

</details>

<details closed><summary>Database</summary>

| File                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                | ---                                                                                                                                                                                                                                                                                                                                                                            |
| [index.ts](https://github.com//blob/main/assets/database/index.ts) | The code defines a Dexie database instance named "data_table" with two tables: "data" and "metaData". The "data" table stores data with an auto-increment primary key and various indexed columns. The "metaData" table stores metadata. The code initializes the database and provides access to the tables. The exported instance can be used to interact with the database. |

</details>

<details closed><summary>Actions</summary>

| File                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                | ---                                                                                                                                                                                                                                                                                                                                                                      |
| [converter.ts](https://github.com//blob/main/assets/database/actions/converter.ts) | The code in "converter.ts" provides functions to convert JSON data to XML, delimited files (CSV/TSV), and XLSX files. It also includes utility functions to escape key names and automatically fit column widths in XLSX files. The functions are exported for use in other modules.                                                                                     |
| [data.ts](https://github.com//blob/main/assets/database/actions/data.ts)           | The code in assets/database/actions/data.ts contains functions for loading paginated data, storing data, and destroying the database using Dexie, a wrapper for IndexedDB. The loadPageData function retrieves paginated data based on filters and sorting, while the storeData function saves data to the database. The destroyDB function deletes the entire database. |
| [metadata.ts](https://github.com//blob/main/assets/database/actions/metadata.ts)   | The code provides functions to store and retrieve the latest version of a database update using Dexie, a wrapper for IndexedDB. It allows storing the version in Dexie and retrieving it when needed.                                                                                                                                                                    |

</details>

<details closed><summary>Workers</summary>

| File                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [dataworker.ts](https://github.com//blob/main/assets/workers/dataworker.ts) | The code defines a web worker that handles data storage, retrieval, destruction, and downloading. It interacts with the database to store and retrieve data, and converts data into various formats like XML, CSV, TSV, and XLSX for downloading purposes. The worker communicates with the main thread using message passing. The core functionalities include storing data, fetching data, destroying the database, and downloading data in different formats. |

</details>

<details closed><summary>Components</summary>

| File                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [Export.vue](https://github.com//blob/main/components/Export.vue)         | This code defines a Vue component for exporting data. It includes a button to toggle a dropdown menu with export options such as CSV, TSV, XLSX, JSON, and XML. Selecting an option triggers an export request with the chosen format. The dropdown menu uses Vue's transition component for animation.                                                                                                                  |
| [Footer.vue](https://github.com//blob/main/components/Footer.vue)         | The code defines the structure and content of a Vue component called "Footer". It contains HTML markup for a footer section, including text about searching a database, column descriptions, and copyright information. The component also includes a "ShowMore" component that displays column descriptions in a collapsible manner. The column descriptions are provided as an array of objects called "descriptions". |
| [Navbar.vue](https://github.com//blob/main/components/Navbar.vue)         | This code is for the navigation bar component of a website. It includes a mobile-friendly hamburger menu, logo, and navigation links. The mobile menu can be toggled with a button. The component also contains a link to an external page. Animation effects are applied to the mobile menu transitions.                                                                                                                |
| [PageSize.vue](https://github.com//blob/main/components/PageSize.vue)     | This code defines and implements a Vue component called PageSize. It provides a dropdown menu to select the number of items to display per page. The component manages the state of the dropdown, the selected option, and emits the chosen page size to the parent component. It also handles transitions and styling.                                                                                                  |
| [Filter/index.vue](https://github.com//blob/main/components/Filter/index.vue) | This code is a Vue component that implements a filter functionality. It allows users to dynamically add, remove, and search/filter data based on selected columns. The component keeps track of the filter queries and updates the URL query parameters accordingly. It also decodes and loads filter queries from the URL when the page is loaded or the browser's back/forward buttons are used. The filter queries are emitted through an event for further processing. |
| [Table/index.vue](https://github.com//blob/main/components/Table/index.vue) | The code represents a Vue component called "Table" that displays tabular data. It consists of a table structure with columns and rows rendered dynamically based on the provided data and column definitions. It supports sorting of columns, pagination, and changing the number of items per page. The component emits events for sorting, page change, and page size change. The total number of pages is calculated based on the total items and page size. |
| [Columns/index.vue](https://github.com//blob/main/components/Table/Columns/index.vue) | The code defines the behavior of a table header column. It includes functionality for sorting the column in ascending or descending order when clicked. The code also handles the display of an arrow icon indicating the current sort direction. The component uses Vue.js syntax, including props, refs, emits, and scoped styles. |
| [Rows/index.vue](https://github.com//blob/main/components/Table/Rows/index.vue) | The code represents a Vue component for rendering a table row. It takes in data for the row and the table columns as props, and dynamically generates cells for each column. The values from the row data are displayed in the corresponding cells. |
| [Pagination.vue](https://github.com//blob/main/components/Pagination.vue) | The code represents a Vue component for pagination. It generates a set of buttons representing pages, and allows the user to navigate to different pages. The component receives the current page and total number of pages as props, and emits a "pageChange" event when the page is changed. It also dynamically updates the pages array based on the total number of pages.                                           |
| [ShowMore.vue](https://github.com//blob/main/components/ShowMore.vue)     | This code defines a Vue component called ShowMore. It renders a button that toggles between two texts. On button click, it animates the display of a slot content. The component has two required props for the text before and after toggling. The styling is scoped.                                                                                                                                                   |

</details>

<details closed><summary>Layouts</summary>

| File                                                             | Summary                                                                                                                                                                                                                                                                                            |
| ---                                                              | ---                                                                                                                                                                                                                                                                                                |
| [404.vue](https://github.com//blob/main/layouts/404.vue)         | The code in the file "404.vue" defines the layout for a custom 404 error page in a Vue.js project. It sets up a styling for a page with a dark background color, radial gradient, and a pulsating animation. It provides a container for other elements to be displayed in the center of the page. |
| [Default.vue](https://github.com//blob/main/layouts/Default.vue) | This code represents the default layout of a Vue.js application. It includes a fixed header with a navbar component, a main section with a slot for dynamic content, and a fixed footer.                                                                                                           |

</details>

<details closed><summary>Pages</summary>

| File                                                       | Summary                                                                                                                                                                                                                                                                                                            |
| ---                                                        | ---                                                                                                                                                                                                                                                                                                                |
| [about.vue](https://github.com//blob/main/pages/about.vue) | This code defines the behavior of the "About" page in a Vue.js application.                                                                                                                |
| [index.vue](https://github.com//blob/main/pages/index.vue) | This code defines the functionality for a web page that displays a table of data related to radiation biology and physics. It includes filtering, sorting, pagination, and data exporting features. The code interacts with a worker service to fetch data and updates the page dynamically based on user actions. |

</details>

<details closed><summary>Middleware</summary>

| File                                                                             | Summary                                                                                                                                                                                                                                                                            |
| ---                                                                              | ---                                                                                                                                                                                                                                                                                |
| [checkHeader.ts](https://github.com//blob/main/server/middleware/checkHeader.ts) | This code is a middleware that checks the "x-proxy-token" header in an HTTP request. If the header is missing or incorrect, it redirects the request to a specified URL using a 301 status code. It relies on the "getHeader" function from the "h3" package for header retrieval. |

</details>

<details closed><summary>Services</summary>

| File                                                                        | Summary                                                                                                                                                                                                                                           |
| ---                                                                         | ---                                                                                                                                                                                                                                               |
| [WorkerService.ts](https://github.com//blob/main/services/WorkerService.ts) | This code defines a `WorkerService` class that performs data handling and processing. It manages worker threads, handles data fetching and filtering, maintains pagination, supports data export in various formats, and handles version updates. |

</details>

## Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Node.js v18.x`

`- ℹ️ npm or pnpm`



### Installation

1. Clone the radphysbio repository:
```sh
git clone https://github.com/gokaybiz/radphysbio
```

2. Change to the project directory:
```sh
cd radphysbio
```

3. Install the dependencies:
```sh
pnpm install
```
or
```sh
npm install
```

### Running RadPhysBio

```sh
pnpm run dev
```
