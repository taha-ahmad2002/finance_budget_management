# Finance and Budget Management System

I created this project for my practice purpose. I was assigned this project by my company where I was doing my internship. It solves the problem of budget tracking by keeping the record of incomes, expense and transfers. It provides the graphical as well as digital analysis of the finance weekly, monthly, yearly and daily. User have to create account to keep the record of his/her finance.

## Key Focus Areas
- Primary goal I achieved: Got by grip on Next JS and FastAPIs Python.




## Features I Implemented

- **Authentication**: User can make account by giving his/her email and password and then log in as well.
- **Create entries**: User can create expense, transfers or incomes by filling respective forms.
- **Delete entries**: User can delete expense, transfers or incomes by just clicking a button.
- **Update entries**: User can update expense, transfers or incomes by just clicking a button and replacing the old entries with new ones in the form that gets opened.
- **View entries**: Whatever user has created, he/she can see his/her created expense, income or transfer.
- **Pie charts**: Users can view their expenses, incomes and transfers on multiple items in pie charts.
- **Timely records**: User can see weekly, monthly, daily and yearly records of their expenses, incomes and transfers and net worths.








## Screenshots

**Dashboard I Designed**  
![Dashboard](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20171313.png?raw=true)

**Expense Page**  
![Expense](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20171326.png?raw=true)

**Income Creation Page**  
![Create Income](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20171347.png?raw=true)

**Income Page**  
![Mobile](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20171421.png?raw=true)

**Transfer Creation Page**  
![Transfer Creation](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20171438.png?raw=true)

**Auth Page**  
![Auth](https://github.com/taha-ahmad2002/finance_budget_management/blob/main/screenshots/Screenshot%202026-02-16%20225149.png?raw=true)





## My Tech Stack

**Frontend:**  
Next JS · Tailwind CSS  

**Backend:**  
Fast APIs Python 

**Database:**  
PostgreSQL  




## Prerequisites

Before you begin, ensure you have met the following requirements:
- pgAdmin 4
- npm >= 10.x




## Installation

Here's how to install my project:

```bash
# Clone my repository
git clone https://github.com/taha-ahmad2002/finance_budget_management.git

# Create and activate virtual enviroment
python -m venv .venv   
.venv\Scripts\activate      

# Create requirements.txt file 
python-dotenv~=1.2.1
fastapi~=0.129.0
python-jose~=3.5.0
passlib~=1.7.4
SQLAlchemy~=2.0.46
pydantic~=2.12.5

# Install the dependencies in requirements.txt file
pip install requirements.txt

# Go back to frontend folder
cd frontend

# Install dependencies required
npm install

# Start the development server
npm run dev

# Configure your pgAdmin PostgreSQL database and make the file .env in project folder with following content
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=

# Go back
cd..

# Start the development server
uvicorn backend.main:app --reload


```



## Authors

The authors of this project include:
- [@taha-ahmad2002](https://github.com/taha-ahmad2002) - Lead developer





## My Development Roadmap

Future plans I'm considering:
- [ ] **Security**: Make it more secure.
- [ ] **Performance**: Optimize it and make is as smooth as possible.
- [ ] **Scalability**: Improvements in scalability.
- [ ] **Directory Structure**: Improvements in directory structure.
- [ ] **Deployment**: Deploy the project to make it easy to use for everyone.

