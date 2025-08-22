### Database Design (ER Diagram)

```mermaid
erDiagram
    USERS {
        int id PK
        string email UK
        string hashed_password
        string first_name
        string last_name
        string phone
        string membership_level
        string member_code UK
        string membership_joined_on
        int points_balance
        datetime created_at
        datetime updated_at
    }
```

Notes:
- `email` is unique and used for login.
- `member_code` mirrors the membership card code shown in the UI.
- `membership_joined_on` is stored as a string for convenience (e.g. "15/6/2566").

