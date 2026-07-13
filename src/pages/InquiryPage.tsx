import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquiryAPI } from '../services/api'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2),
  mobile: z.string().min(10),
  email: z.string().email(),
  product: z.string().optional(),
  message: z.string().min(5)
})

type Form = z.infer<typeof schema>

export default function InquiryPage(){
  const { register, handleSubmit, reset, formState:{errors, isSubmitting} } = useForm<Form>({ resolver: zodResolver(schema)})
  const onSubmit = async (data:Form)=>{
    try{
      await inquiryAPI.create(data)
      toast.success('Inquiry sent! We will WhatsApp you shortly.')
      reset()
    }catch(e:any){ toast.error(e?.response?.data?.message || 'Failed')}
  }
  return (
    <div className="container-custom py-12 max-w-5xl">
      <h1 className="font-playfair text-4xl text-center">Beauty Inquiry</h1>
      <p className="text-center text-gray-600 mt-2">Ask our Surat beauty experts – reply within 2 hours</p>
      <div className="grid md:grid-cols-5 gap-8 mt-10">
        <div className="md:col-span-3 card-luxury p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><input placeholder="Full Name *" {...register('name')} className="input-lux"/>{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}</div>
              <div><input placeholder="Mobile Number *" {...register('mobile')} className="input-lux"/>{errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}</div>
            </div>
            <div><input placeholder="Email *" type="email" {...register('email')} className="input-lux"/>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}</div>
            <div><input placeholder="Product Interested In (optional)" {...register('product')} className="input-lux"/></div>
            <div><textarea placeholder="Your message..." rows={5} {...register('message')} className="input-lux"/>{errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}</div>
            <button disabled={isSubmitting} className="btn-primary w-full">{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</button>
            <p className="text-xs text-gray-500 text-center">We store your inquiry securely. Typically reply via WhatsApp in 2 hrs.</p>
          </form>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="card-luxury p-6">
            <div className="font-playfair text-xl mb-2">Roop Rang Boutique</div>
            <div className="text-sm text-[#5a4044] leading-relaxed">
              Shop No 521, Apex Building,<br/>
              Madhuram Circle, Dindoli,<br/>
              Surat, Gujarat – 394210<br/><br/>
              <b>+91 7096241594</b><br/>
              rangroop@gmail.com
            </div>
            <a href="https://wa.me/917096241594" className="btn-primary w-full mt-4 inline-block text-center">Chat on WhatsApp</a>
          </div>
          <div className="card-luxury p-6 text-sm">
            <b>Business Hours</b><br/>
            Mon-Sat: 10am – 9pm<br/>
            Sunday: 11am – 8pm
          </div>
        </div>
      </div>
    </div>
  )
}
