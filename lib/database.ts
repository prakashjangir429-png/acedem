import 'server-only';
import { MongoClient } from 'mongodb';
const state=globalThis as typeof globalThis & {academyMongo?:Promise<MongoClient>};
export async function database(){const uri=process.env.MONGODB_URI;if(!uri)throw new Error('MongoDB is not configured');if(!state.academyMongo)state.academyMongo=new MongoClient(uri,{serverSelectionTimeoutMS:8000}).connect().catch(error=>{state.academyMongo=undefined;throw error;});return (await state.academyMongo).db(process.env.MONGODB_DB||'digitonix_academy');}
