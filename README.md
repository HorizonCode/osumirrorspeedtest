# osu! Mirror Speed-Test

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The osu! Mirror Speed-Test is a React web application designed to help osu! players find the fastest mirror for downloading/fetching beatmaps. If you've ever experienced slow download speeds or interruptions while downloading/fetching beatmaps, this tool can help you identify the mirror that provides the best speed for your location.

## Features

- **Mirror Speed Test**: Test the download speed for multiple osu! beatmap mirrors to find the fastest one for your location.
- **Mirror Selection**: Based on the speed test results, the app suggests the best mirror for you to use.
- **Mirror Information**: View detailed information about each mirror, such as location, average response speed and requests per second.
- **User-Friendly Interface**: The app offers a simple and intuitive user interface for a smooth experience.
- **Responsive Design**: Access the tool on desktop and mobile devices for convenience.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js >= 18**: You should have Node.js installed on your computer. If not, you can download it from [nodejs.org](https://nodejs.org/).

### Installation

Follow these steps to install and run the osu! Mirror Speed-Test:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/horizoncode/osumirrorspeedtest
   ```

2. Navigate to the project directory:

   ```shell
   cd osumirrorspeedtest
   ```

3. Install the project dependencies:

   ```shell
   npm i
   ```

4. Start the development server:

   ```shell
   npm run dev
   ```

5. Open your web browser and visit `http://localhost:5173/osumirrorspeedtest/` to access the osu! Mirror Speed-Test.

## Usage

1. Launch the osu! Mirror Speed-Test web application in your browser by following the installation instructions above.

2. On the home page, input the number of requests you want to make and then click the "Start Test" button to begin testing the download speeds of various osu! beatmap mirrors.

3. Wait for the speed test to complete. The app will display the results, including the mirror with the fastest download speed for your location.

## Contributing

We welcome contributions from the osu! community to make this tool even better. If you'd like to contribute, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.