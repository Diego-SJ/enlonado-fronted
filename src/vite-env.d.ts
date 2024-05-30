/// <reference types="vite/client" />

declare module 'path'

declare module '@supabase/supabase-js' {
	export function createClient(url: string, apiKey: string): any
}
