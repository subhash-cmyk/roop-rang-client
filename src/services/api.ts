import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const api = axios.create({ baseURL: API_URL, withCredentials: true });
export const productAPI = {
  list: (params?: any) => api.get('/products', { params }).then(r=>r.data),
  get: (id:number) => api.get(`/products/${id}`).then(r=>r.data),
  featured: () => api.get('/products/featured').then(r=>r.data),
  newArrivals: () => api.get('/products/new').then(r=>r.data),
  offers: () => api.get('/products/offers').then(r=>r.data),
  byCategory: (slug:string) => api.get(`/products/category/${slug}`).then(r=>r.data),
};
export const categoryAPI = { list: () => api.get('/categories').then(r=>r.data) };
export const offerAPI = { list: () => api.get('/offers').then(r=>r.data) };
export const inquiryAPI = { create: (payload:any) => api.post('/inquiry', payload).then(r=>r.data) };
export const settingsAPI = { get: () => api.get('/settings').then(r=>r.data) };
export const cmsAPI = { privacy: () => api.get('/privacy-policy').then(r=>r.data), terms: () => api.get('/terms').then(r=>r.data) };
export const getImageUrl = (url?:string) => { if(!url) return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80'; if(url.startsWith('http')) return url; return `http://localhost:5000${url}`; };
export const whatsappBuy = (productName:string, price:number) => { const number = '917096241594'; const msg = encodeURIComponent(`Hi Roop Rang! 💄\nI want to buy:\n${productName}\nPrice: ₹${price}\nPlease confirm availability.`); window.open(`https://wa.me/${number}?text=${msg}`, '_blank'); };
