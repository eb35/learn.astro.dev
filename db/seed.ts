import { db, Links } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Links).values([
		{
			title: "Title2",
			url: "google.com",
			isRead: true,
			upvoteNum: 3,
		},
		{
			title: "Coding in Public",
			url: "codinginpublic.dev",
			isRead: false,
			upvoteNum: 10000,
		},
		{
			title: "Blog",
			url: "therobhenry.com",
			isRead: true,
			upvoteNum: 1234,
		}
	]);
}
