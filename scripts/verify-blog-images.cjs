const assert=require('node:assert/strict');
const fs=require('node:fs');
const sharp=require('sharp');
const {MongoClient,ObjectId}=require('mongodb');
require('@next/env').loadEnvConfig(process.cwd());
const base='http://127.0.0.1:8888';
async function main(){const client=new MongoClient(process.env.MONGODB_URI);await client.connect();const db=client.db(process.env.MONGODB_DB);let imageId,blogId;const slug='image-verification-'+Date.now();try{
 const password=fs.readFileSync('outputs/Admin-access.txt','utf8').match(/Password: (.+)/)[1];
 const login=await fetch(base+'/api/admin/login',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({email:process.env.ADMIN_EMAIL,password})});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];
 const upload=async(bytes,type,authenticated=true)=>{const form=new FormData();form.append('image',new Blob([bytes],{type}),'cover.png');return fetch(base+'/api/admin/upload',{method:'POST',headers:{Origin:base,...(authenticated?{Cookie:cookie}:{})},body:form});};
 assert.equal((await upload(Buffer.from('fake'),'image/png',false)).status,401);
 assert.equal((await upload(Buffer.from('<svg></svg>'),'image/png')).status,400);
 assert.equal((await upload(Buffer.alloc(5*1024*1024+1),'image/png')).status,413);
 const png=await sharp({create:{width:100,height:60,channels:3,background:'#e4c47f'}}).png().toBuffer();const uploaded=await upload(png,'image/png');assert.equal(uploaded.status,200);const data=await uploaded.json();imageId=data.url.split('/').pop();
 const served=await fetch(base+data.url);assert.equal(served.status,200);assert.equal(served.headers.get('content-type'),'image/webp');assert.equal((await sharp(Buffer.from(await served.arrayBuffer())).metadata()).width,100);
 const blog={title:'Image verification',slug,excerpt:'Image integration check',content:'<p>Image integration check.</p>',author:'Verification',category:'Test',coverImage:data.url,status:'published',metaTitle:'Image test',metaDescription:'Image test'};
 const created=await fetch(base+'/api/admin/manage/blogs',{method:'POST',headers:{Origin:base,Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify(blog)});assert.equal(created.status,200);blogId=(await created.json()).id;
 const listing=await fetch(base+'/blogs');assert.equal(listing.status,200);assert.ok((await listing.text()).includes(data.url));const detail=await fetch(base+'/blogs/'+slug);assert.equal(detail.status,200);assert.ok((await detail.text()).includes(data.url));
 const samples=await db.collection('blogs').find({sample:true,status:'published'}).toArray();assert.equal(samples.length,10);for(const sample of samples){assert.ok(sample.coverImage);assert.ok(await db.collection('blogImages').findOne({_id:new ObjectId(sample.coverImage.split('/').pop())}));}
 console.log('PASS: authentication, invalid images, size limit, upload, WebP delivery, blog save, listing/detail image mapping and 10 published samples.');
 }finally{if(blogId)await db.collection('blogs').deleteOne({_id:new ObjectId(blogId)});if(imageId)await db.collection('blogImages').deleteOne({_id:new ObjectId(imageId)});await client.close();}}
main().catch(e=>{console.error('Image verification failed: '+e.message);process.exitCode=1;});
