import { useEffect, useState } from 'react'
import { cmsAPI } from '../services/api'
export default function PrivacyPage(){
  const [data,setData]=useState<any|null>(null)
  useEffect(()=>{cmsAPI.privacy().then(r=>setData(r.data))},[])
  return (
    <div className="container-custom py-12 max-w-4xl">
      <h1 className="font-playfair text-4xl mb-6">{data?.title || 'Privacy Policy'}</h1>
      <div className="card-luxury p-8 prose max-w-none" dangerouslySetInnerHTML={{__html: data?.content || '<p>At Roop Rang, we respect your privacy. Your inquiry data is used only to contact you about products. We never sell data. Contact: rangroop@gmail.com, +91 7096241594, Surat.</p><p>Full policy maintained by admin panel.</p>'}}/>
    </div>
  )
}
