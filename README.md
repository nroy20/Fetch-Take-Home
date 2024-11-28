# Receipt Processor Application

This is a web application for processing receipts and calculating points based on the total price of the items. The application allows users to submit receipt information, including retailer, purchase date, items purchased, and total price. After submission, the app generates a unique receipt ID. Users can then search for the points associated with a specific receipt using the ID.

## Features

- **Submit Receipt**: Allows users to enter details like retailer, purchase date, items, and total cost.
- **Search for Points**: Search and view the points associated with a receipt using its unique ID.
- **Multiple Items**: Supports adding, removing, and editing items on a receipt.

## Prerequisites

Ensure the following are installed on your system:

- **Docker**: The project is packaged with Docker, so you’ll need Docker installed to run it locally.
  
## Getting Started

### Step 1: Clone the repository

Clone the repository to your local machine.

### Step 2: Build the Docker container

Navigate to the project directory and build the Docker container using the following commands:

```bash
cd receipt-processor
docker build -t receipt-processor .
```

This will create a Docker image tagged `receipt-processor`.

### Step 3: Run the Docker container

Once the image is built, you can run the application inside a Docker container:

```bash
docker run -p 3000:3000 receipt-processor
```

This will start the app on port `3000`. You should now be able to access the application at:

```
http://localhost:3000
```

### Step 4: Test the Application

You can now interact with the app by submitting receipts and querying their points.

1. **Submit a Receipt**: Enter details in the form (retailer, date, items, total) and submit it.
2. **Search by Receipt ID**: Use the generated receipt ID to search for points associated with that receipt.

### Step 5: Stopping the Docker container

To stop the Docker container, you can either:

1. Press `Ctrl+C` in your terminal, or
2. Run the following command to stop all containers:
   
   ```bash
   docker stop $(docker ps -q)
   ```

## Application Details

- **Frontend**: Built with React (TypeScript) and styled using basic CSS.
- **Backend**: The API is handled through server-side routes in Next.js.
- **Data Storage**: Currently, receipt data is stored in-memory within the application and will be lost when the application restarts.

## Running Tests

To ensure everything works as expected, you can run unit tests or end-to-end tests. This can be done inside the Docker container (if you have a test suite configured). You can add testing instructions once the testing framework is set up.

## License

This project is licensed under the MIT License.
