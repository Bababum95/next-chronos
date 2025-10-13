[**next-chronos**](../../../../README.md)

***

[next-chronos](../../../../README.md) / [lib/utils/auth](../README.md) / tokenStorage

# Variable: tokenStorage

> `const` **tokenStorage**: `object`

Defined in: [src/lib/utils/auth.ts:5](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/utils/auth.ts#L5)

## Type Declaration

### getToken()

> **getToken**: () => `string` \| `null`

Get authentication token from cookies

#### Returns

`string` \| `null`

Token string or null if not found

### isAuthenticated()

> **isAuthenticated**: () => `boolean`

Check if user is authenticated (has valid token)

#### Returns

`boolean`

Boolean indicating if token exists

### removeToken()

> **removeToken**: () => `void`

Remove authentication token from cookies

#### Returns

`void`

### setToken()

> **setToken**: (`token`, `expirationDays`) => `void`

Save authentication token to cookies

#### Parameters

##### token

`string`

token to save

##### expirationDays

`number` = `7`

Number of days until token expires (default: 7)

#### Returns

`void`
