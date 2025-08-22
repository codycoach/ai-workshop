import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8000';

test.describe('FastAPI Swagger E2E', () => {
  test('openapi reachable and core auth/profile flows work', async () => {
    const api = await request.newContext({ baseURL: BASE_URL });

    // 1) OpenAPI should be reachable
    const openapi = await api.get('/openapi.json');
    expect(openapi.ok()).toBeTruthy();
    const spec = await openapi.json();
    expect(spec.openapi).toBeDefined();

    // 2) Register a unique user
    const unique = Date.now();
    const email = `user${unique}@example.com`;
    const memberCode = `LBK${unique}`;
    const registerRes = await api.post('/auth/register', {
      data: {
        email,
        first_name: 'Test',
        last_name: 'User',
        phone: '0123456789',
        membership_level: 'Gold',
        member_code: memberCode,
        membership_joined_on: '15/6/2566',
        points_balance: 15420,
        password: 'secret123',
      },
    });
    expect(registerRes.ok()).toBeTruthy();
    const registered = await registerRes.json();
    expect(registered.email).toBe(email);

    // 3) Login with OAuth2 form
    const loginRes = await api.post('/auth/login', {
      form: { username: email, password: 'secret123' },
    });
    expect(loginRes.ok()).toBeTruthy();
    const token = await loginRes.json();
    expect(token.access_token).toBeTruthy();

    const authApi = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token.access_token}` },
    });

    // 4) GET /me
    const meRes = await authApi.get('/me');
    expect(meRes.ok()).toBeTruthy();
    const me = await meRes.json();
    expect(me.email).toBe(email);

    // 5) PUT /me update
    const updateRes = await authApi.put('/me', {
      data: { first_name: 'Updated' },
    });
    expect(updateRes.ok()).toBeTruthy();
    const updated = await updateRes.json();
    expect(updated.first_name).toBe('Updated');
  });
});


