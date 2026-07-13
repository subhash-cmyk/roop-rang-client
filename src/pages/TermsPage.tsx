import { useEffect, useState } from 'react'
import { cmsAPI } from '../services/api'
export default function TermsPage(){
  const [data,setData]=useState<any|null>(null)
  useEffect(()=>{cmsAPI.terms().then(r=>setData(r.data))},[])
  return (
    <div className="container-custom py-12 max-w-4xl">
      <h1 className="font-playfair text-4xl mb-6">{data?.title || 'Terms & Conditions'}</h1>
      <div className="card-luxury p-8 prose max-w-none" dangerouslySetInnerHTML={{__html: data?.content || '<p>Welcome to Roop Rang. By using our site you agree to WhatsApp ordering, authentic product guarantee, and Surat store policies.</p>'}}/>
    </div>
  )
}
