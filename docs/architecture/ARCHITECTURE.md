# File Submission Portal - Architecture

## System Overview

The File Submission Portal is built on a three-tier architecture:

1. **Frontend Layer** - User interface and client-side logic
2. **Middleware Layer** - Supabase (database, realtime, edge functions)
3. **Storage Layer** - Google Drive for file storage

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Auth    │  │Dashboard │  │  Upload  │  │Analytics │   │
│  │ (Clerk)  │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/JWT
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE MIDDLEWARE                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Postgres   │  │   Realtime   │  │Edge Functions│     │
│  │   Database   │  │   Updates    │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Triggers   │  │   Webhooks   │  │     RLS      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ API
┌─────────────────────────────────────────────────────────────┐
│                      GOOGLE DRIVE                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │File Storage  │  │  Versioning  │  │  Permissions │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Authentication (Clerk)
- JWT-based authentication
- User management (sign-up, login, profile)
- Webhooks for user sync to Supabase
- Role-based access control

### 2. Frontend
- **Pages:** Student, Faculty, Admin dashboards
- **Components:** Modular, reusable (BEM conventions)
- **Services:** API integration layer
- **State Management:** Context API or Redux
- **Styling:** CSS modules with variables

### 3. Supabase Middleware
- **Database:** Postgres with metadata storage
- **Realtime:** Live updates for submissions, notifications
- **Edge Functions:** File operations, analytics, sync
- **Triggers:** Auto-sync with Google Drive
- **RLS Policies:** Row-level security

### 4. Google Drive Storage
- Primary file storage
- Folder organization (per user/course)
- Versioning support
- Webhooks for external changes

## Data Flow

### File Upload Flow
```
User → Frontend → Supabase Edge Function → Google Drive
                ↓
         Metadata stored in Postgres
                ↓
         Realtime notification sent
```

### User Registration Flow
```
User → Clerk Sign-up → Clerk Webhook → Supabase
                                      ↓
                              User record created
                                      ↓
                              Welcome notification
```

### File Change Detection
```
Google Drive → Webhook → Supabase Edge Function
                              ↓
                       Update metadata
                              ↓
                       Notify users
```

## Security Layers

1. **Transport Security:** HTTPS only
2. **Authentication:** JWT tokens (Clerk)
3. **Authorization:** Role-based access control
4. **Database Security:** Row-level security (RLS)
5. **API Security:** Rate limiting, CSRF protection
6. **Storage Security:** Encrypted files, signed URLs

## Scalability Considerations

- **Horizontal Scaling:** Supabase auto-scales
- **Caching:** CDN for static assets, Redis for sessions
- **Load Balancing:** Automatic with Supabase
- **Database Optimization:** Indexes, query optimization
- **File Storage:** Google Drive handles large files

## Performance Optimization

- Lazy loading components
- Code splitting
- Image optimization
- Database query optimization
- Caching strategies
- CDN for static assets
