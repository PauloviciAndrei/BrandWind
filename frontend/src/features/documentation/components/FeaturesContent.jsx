import { useDispatch } from 'react-redux';
import { showNotification } from '../../common/headerSlice';
import { BRAND } from '../../../utils/branding/branding';

function FeaturesContent() {
  const dispatch = useDispatch();

  return (
    <>
      <article className="prose">
        <h1>Features</h1>

        {/* 1 Authentication */}
        <h2 id="feature1">Authentication</h2>
        <p>
          The app uses <strong>JWT-based authentication</strong>. On the
          frontend, the logic resides in{' '}
          <span className="badge badge-ghost">/app/auth.js</span>, which
          automatically adds the bearer token to request headers. The backend
          validates these tokens using{' '}
          <span className="badge badge-ghost">authMiddleware.js</span> to
          protect routes.
        </p>
        <ul>
          <li>
            Register & Login handled via <code>/api/auth</code>
          </li>
          <li>Forgot/Reset password uses email tokens (via Nodemailer)</li>
          <li>
            Profile management via <code>/api/users</code> endpoints
          </li>
        </ul>

        {/* 2 Sidebar */}
        <h2 id="feature2">Left Sidebar</h2>
        <p>
          The sidebar contains navigation for protected routes and is defined in{' '}
          <span className="badge badge-ghost">/routes/sidebar.js</span>.
          Page-to-route mapping is managed through{' '}
          <span className="badge badge-ghost">/routes/index.js</span>.
        </p>

        {/* 3 Add New Page */}
        <h2 id="feature3">Add New Page</h2>
        <p>You can add pages easily for both public and protected routes:</p>
        <ul>
          <li>
            Create the new component inside <code>/pages</code>
          </li>
          <li>
            Add its route in <code>App.js</code> (public) or{' '}
            <code>sidebar.js</code> (protected)
          </li>
          <li>
            For public pages, include the path in <code>PUBLIC_ROUTES</code>{' '}
            inside <code>/app/auth.js</code>
          </li>
        </ul>

        {/* 4 Right Sidebar */}
        <h2 id="feature4">Right Sidebar</h2>
        <p>
          The right sidebar displays contextual information like notifications
          or settings. It’s a single component controlled by Redux actions — you
          can open custom drawers dynamically using{' '}
          <code>openRightDrawer()</code>.
        </p>

        {/* 5 Themes */}
        <h2 id="feature5">Themes</h2>
        <p>
          The project uses <strong>DaisyUI</strong> themes with Tailwind CSS.
          Both light and dark modes are included by default. You can add or
          modify themes in{' '}
          <span className="badge badge-ghost">tailwind.config.js</span>.
        </p>

        {/* 6 Modal */}
        <h2 id="feature6">Modal</h2>
        <p>
          The global modal system uses Redux and can be triggered from anywhere
          in the app. Create a new modal component, register it in{' '}
          <span className="badge badge-ghost">
            /utils/globalConstantUtils.js
          </span>
          , and call <code>openModal()</code> to display it.
        </p>

        {/* 7 Notification */}
        <h2 id="feature7">Notification</h2>
        <p>
          Global notifications are managed by Redux through the{' '}
          <code>showNotification()</code> function from{' '}
          <span className="badge badge-ghost">headerSlice</span>.
        </p>
        <button
          className="btn btn-success"
          onClick={() =>
            dispatch(
              showNotification({
                message: 'Your message has been sent!',
                status: 1,
              })
            )
          }
        >
          Success
        </button>
        <button
          className="btn btn-error ml-4"
          onClick={() =>
            dispatch(
              showNotification({ message: 'Something went wrong!', status: 0 })
            )
          }
        >
          Error
        </button>

        {/* 8 Backend Architecture */}
        <h2 id="feature8">Backend Architecture</h2>
        <p>
          The backend is built with <strong>Node.js + Express</strong> and
          follows a modular, layered architecture:
        </p>
        <ul>
          <li>
            <b>Controllers</b> — Handle HTTP requests and responses
          </li>
          <li>
            <b>Services</b> — Contain business logic and validation
          </li>
          <li>
            <b>Repositories</b> — Handle data access and MongoDB queries
          </li>
          <li>
            <b>Models</b> — Define Mongoose schemas
          </li>
          <li>
            <b>Middleware</b> — JWT verification, validation, CORS setup
          </li>
        </ul>
        <p>
          Each entity (e.g., Sales, Transactions, Events) follows this pattern:
          <code>Route → Controller → Service → Repository → Model</code>
        </p>

        {/* 9 Core Modules */}
        <h2 id="feature9">Core Modules</h2>
        <ul>
          <li>
            <b>Users</b> — Registration, profile management, and photo uploads
          </li>
          <li>
            <b>Transactions</b> — Track expenses/income with filters by
            status/date
          </li>
          <li>
            <b>Sales</b> — Sales analytics and charts grouped by category or
            country
          </li>
          <li>
            <b>Leads</b> — CRM-like lead management with “Open” and “In
            Progress” tracking
          </li>
          <li>
            <b>Events</b> — Calendar event scheduling
          </li>
          <li>
            <b>Teams & Roles</b> — Multi-user role-based access
          </li>
          <li>
            <b>Sites</b> — User behavior analytics and conversion tracking
          </li>
          <li>
            <b>Social Media Pages</b> — Engagement statistics (likes, page
            views)
          </li>
        </ul>

        {/*  Analytics */}
        <h2 id="feature10">Analytics & Insights</h2>
        <p>The backend provides multiple data-driven endpoints:</p>
        <ul>
          <li>
            <code>/api/sales/chart-data</code> — Sales amount per store/month
          </li>
          <li>
            <code>/api/sales/chart-data-count</code> — Number of sales per month
          </li>
          <li>
            <code>/api/sites/conversion-rate</code> — Site conversion percentage
          </li>
          <li>
            <code>/api/sites/active-users-range</code> — Active user trends over
            time
          </li>
        </ul>

        {/* 11 Security & Uploads */}
        <h2 id="feature11">Security & File Uploads</h2>
        <ul>
          <li>All protected routes require JWT validation</li>
          <li>Password hashing using bcrypt</li>
          <li>Profile photo uploads managed by Multer</li>
          <li>Strict MIME and size restrictions (max 5MB)</li>
        </ul>

        {/* 12 Email & Notifications */}
        <h2 id="feature12">Email & Notifications</h2>
        <p>
          The backend integrates <strong>Nodemailer</strong> for password reset
          and email notifications. Additionally, the <code>notifications</code>{' '}
          module allows in-app alerts for user events.
        </p>

        {/* 13️⃣ Branding & Rebranding */}
        <h2 id="feature13">Branding & Rebranding</h2>
        <p>
          The dashboard includes a <strong>branding automation script</strong>{' '}
          that allows easy rebranding of the entire application with a single
          command:
        </p>

        <pre>
          <code>npm run brand</code>
        </pre>

        <p>
          Make sure to set the information for the branding script inside{' '}
          <code> branding.config.json</code> inside the root folder
        </p>

        <pre>
          <code>appName: "your_name"</code>
          <br />
          <code>logoPath: "src/assets/your_file_name"</code>
        </pre>

        <p>
          This script reads configuration from <code>branding.config.json</code>{' '}
          and automatically:
        </p>

        <ul>
          <li>
            Generates favicons and app icons (16×16 to 512×512) using{' '}
            <code>sharp</code>
          </li>
          <li>
            Updates <code>manifest.json</code> and <code>index.html</code> with
            the new app name
          </li>
          <li>
            Replaces branding values in{' '}
            <code>src/utils/branding/branding.js</code>
          </li>
          <li>
            Ensures all components display the correct logo and app name
            consistently
          </li>
        </ul>

        <p>
          This feature simplifies white-labeling, enabling organizations or
          clients to customize the dashboard’s identity (name, logo, favicon)
          without editing source files manually.
        </p>

        <div className="h-24"></div>
      </article>
    </>
  );
}

export default FeaturesContent;
