import 'express-session';

declare module 'express-session' {
	interface SessionData {
		message?: Record<string, any>,
		auth?: boolean,
	}
}