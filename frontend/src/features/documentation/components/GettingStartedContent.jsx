import { useDispatch } from "react-redux";
import { setPageTitle } from "../../common/headerSlice";

function GettingStartedContent() {
  const dispatch = useDispatch();

  return (
    <>
      <article className="prose">
        <h1>Getting Started</h1>

        {/* 1 Introduction */}
        <h2 id="getstarted1">Introduction</h2>
        <p>
          BrandWind is a full-stack dashboard solution built using{" "}
          <span className="font-bold">React + Vite</span> for the frontend and{" "}
          <span className="font-bold">Node.js + Express + MongoDB</span> for the
          backend.
        </p>
        <p>
          The backend provides authentication, user management, file uploads,
          analytics, and modular entities such as Transactions, Sales, Leads,
          Events, Teams, and more.
        </p>

        <h4>Core libraries used - </h4>
        <ul>
          <li>React 18 + Vite</li>
          <li>Tailwind CSS v3.4.18 + DaisyUI</li>
          <li>Redux Toolkit</li>
          <li>React Router v6.4</li>
          <li>HeroIcons v2</li>
          <li>Express.js</li>
          <li>MongoDB (Mongoose)</li>
          <li>JWT Authentication</li>
          <li>Multer for uploads</li>
          <li>Nodemailer for password reset</li>
        </ul>

        <h4>Major features - </h4>
        <ul>
          <li>JWT-based authentication</li>
          <li>Profile photo uploads</li>
          <li>Team and role management</li>
          <li>Transaction, Sale, Lead, and Event modules</li>
          <li>Sales and site analytics with charts</li>
          <li>Dark/Light themes with DaisyUI</li>
          <li>Integrated Redux store for state management</li>
        </ul>

        {/* 2️⃣ How to Use */}
        <h2 id="getstarted2">How to Use</h2>

        <p>
          <strong>1. Clone the repository and install dependencies:</strong>
        </p>
        <pre>
          <code>
            git clone https://github.com/PauloviciAndrei/BrandWind.git
            <br />
            cd BrandWind
            <br />
            <br />
            cd frontend
            <br />
            npm install
            <br />
            npm run dev
            <br />
            <br />
            # Open a second terminal cd ../backend
            <br />
            npm install
            <br />
            npm run dev
          </code>
        </pre>

        <p>
          <strong>
            2. Create a <code>.env</code> file in the <code>frontend</code>{" "}
            folder:
          </strong>
        </p>
        <pre>
          <code>VITE_BASE_URL=&lt;your-backend-url&gt;/api</code>
        </pre>

        <p>
          <strong>
            3. Create a <code>.env</code> file in the <code>backend</code>{" "}
            folder:
          </strong>
        </p>
        <pre>
          <code>
            MONGO_URI=your_mongo_uri
            <br />
            PORT=your_port
            <br />
            JWT_SECRET=your_secret
            <br />
            JWT_EXPIRES_IN=7d
            <br />
            EMAIL_USER=you@yourmail.com
            <br />
            EMAIL_PASS=password
            <br />
            FRONTEND_URL=frontend_url
          </code>
        </pre>

        <h3>MongoDB Setup</h3>
        <p>
          You can use either a local MongoDB installation or MongoDB Atlas
          (cloud):
        </p>

        <p>
          <strong>Local MongoDB</strong>
        </p>
        <ol>
          <li>
            Download & Install MongoDB Community Edition:
            https://www.mongodb.com/try/download/community
          </li>
          <li>Start MongoDB service:</li>
        </ol>
        <pre>
          <code>
            # On Windows (PowerShell): net start MongoDB
            <br />
            # On macOS with Homebrew: brew services start mongodb-community
            <br /># On Linux: sudo systemctl start mongod
          </code>
        </pre>

        {/* 3 Tailwind CSS */}
        <h2 id="getstarted3">Tailwind CSS</h2>
        <p>
          Tailwind CSS is a utility-first CSS framework. We use it together with
          DaisyUI for styling and theming.
        </p>

        {/* 4 Daisy UI */}
        <h2 id="getstarted4">Daisy UI</h2>
        <p>
          DaisyUI provides ready-to-use styled components like buttons, modals,
          and cards, simplifying Tailwind class usage.
        </p>

        {/* 5 Chart JS */}
        <h2 id="getstarted5">Chart JS</h2>
        <p>
          Chart.js is used for sales and analytics visualizations. The backend
          exposes endpoints like <code>/api/sales/chart-data</code> for dynamic
          chart rendering.
        </p>

        {/* 6 Redux Toolkit */}
        <h2 id="getstarted6">Redux Toolkit</h2>
        <p>
          Redux Toolkit manages app-wide state, notifications, and API calls. It
          simplifies store setup and async logic.
        </p>

        {/* 7 Hero Icons */}
        <h2 id="getstarted7">Hero Icons</h2>
        <p>
          We use HeroIcons for consistent SVG icons across the dashboard. Each
          icon is imported as a React component.
        </p>

        {/* 8 Project Structure */}
        <h2 id="getstarted8">Project Structure</h2>
        <h4>Frontend folders:</h4>
        <ul>
          <li>
            <b>app/</b> – Redux store and auth setup
          </li>
          <li>
            <b>components/</b> – Common reusable UI elements
          </li>
          <li>
            <b>features/</b> – Each page’s logic, components, and Redux slice
          </li>
          <li>
            <b>pages/</b> – Page-level components
          </li>
          <li>
            <b>routes/</b> – Router configuration
          </li>
        </ul>

        {/* 9 Backend Overview */}
        <h2 id="getstarted9">Backend Overview</h2>
        <p>
          The backend follows a clean layered structure with separation between
          routing, controllers, services, repositories, and models.
        </p>
        <ul>
          <li>
            <code>config/</code> – DB and file upload configs
          </li>
          <li>
            <code>models/</code> – Mongoose schemas
          </li>
          <li>
            <code>repositories/</code> – Data logic and aggregations
          </li>
          <li>
            <code>services/</code> – Business logic
          </li>
          <li>
            <code>controllers/</code> – Handle requests and responses
          </li>
          <li>
            <code>routes/</code> – Route grouping per feature
          </li>
          <li>
            <code>middleware/</code> – JWT and validation
          </li>
        </ul>

        {/* 10 API Endpoints */}
        <h2 id="getstarted10">API Endpoints</h2>
        <ul>
          <li>
            <b>Auth:</b> /api/auth → register, login, forgot/reset password
          </li>
          <li>
            <b>Users:</b> /api/users → CRUD, /me, /me/photo
          </li>
          <li>
            <b>Transactions:</b> /api/transactions → filters by status/date
          </li>
          <li>
            <b>Sales:</b> /api/sales → total, chart-data, by category/country
          </li>
          <li>
            <b>Leads:</b> /api/leads → CRUD, pending leads
          </li>
          <li>
            <b>Events:</b> /api/events → CRUD
          </li>
          <li>
            <b>Teams & Roles:</b> /api/teams, /api/team-roles → CRUD
          </li>
          <li>
            <b>Sites:</b> /api/sites → conversion and active users
          </li>
          <li>
            <b>Social Media:</b> /api/socialmediapages → CRUD
          </li>
          <li>
            <b>Notifications:</b> /api/notifications → CRUD
          </li>
        </ul>

        <p>
          All protected routes require a valid JWT in the Authorization header.
          Use the middleware <code>authMiddleware.js</code> for route
          protection.
        </p>

        <div className="h-24"></div>
      </article>
    </>
  );
}

export default GettingStartedContent;
