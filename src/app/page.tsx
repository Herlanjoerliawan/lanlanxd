'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Crown, Zap, Check, X, ShoppingBag, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

// Package data
const BIASA_PACKAGES = [
  { duration: '1 Bulan', price: null, label: 'TUTUP' },
  { duration: '2 Bulan', price: null, label: 'TUTUP' },
  { duration: '3 Bulan', price: 25000, label: 'Rp.25.000' },
  { duration: '1 Tahun', price: 35000, label: 'Rp.35.000' },
  { duration: 'PERMANENT', price: 50000, label: 'Rp.50.000' },
]

const PREMIUM_PACKAGES = [
  { duration: '1 Bulan', price: 25000, label: 'Rp.25.000' },
  { duration: '2 Bulan', price: 50000, label: 'Rp.50.000' },
  { duration: '3 Bulan', price: 70000, label: 'Rp.70.000' },
  { duration: '1 Tahun', price: 90000, label: 'Rp.90.000' },
  { duration: 'PERMANENT', price: 150000, label: 'Rp.150.000' },
]

const WHATSAPP_NUMBER = '6285171197324'

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<{
    type: string
    duration: string
    price: number | null
    label: string
  } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectPackage = (type: string, pkg: { duration: string; price: number | null; label: string }) => {
    if (!pkg.price) {
      toast.error('Paket ini tidak tersedia')
      return
    }
    setSelectedPackage({ type, ...pkg })
    setIsDialogOpen(true)
  }

  const handlePayment = async () => {
    if (!selectedPackage || !selectedPackage.price) return

    if (!customerName.trim()) {
      toast.error('Mohon masukkan nama Anda')
      return
    }

    if (!notes.trim()) {
      toast.error('Mohon masukkan link group')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_type: selectedPackage.type,
          duration: selectedPackage.duration,
          price: selectedPackage.price,
          customer_name: customerName,
          customer_email: customerEmail,
          notes: notes,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Redirecting ke WhatsApp...')
        
        // Create WhatsApp message
        const message = encodeURIComponent(
          `*LANLAN STORE - ORDER*\n\n` +
          `*Paket:* ${selectedPackage.type}\n` +
          `*Durasi:* ${selectedPackage.duration}\n` +
          `*Harga:* ${selectedPackage.label}\n\n` +
          `*Nama:* ${customerName}\n` +
          `*Email:* ${customerEmail || '-'}\n\n` +
          `*Link Group:* ${notes}\n\n` +
          `_Terima kasih telah order di LANLAN STORE!_`
        )

        // Redirect to WhatsApp
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
        setIsDialogOpen(false)
      } else {
        toast.error('Gagal membuat pembayaran. Silakan coba lagi.')
      }
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20">
                <Image
                  src="/logo.png"
                  alt="LANLAN STORE Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  LANLAN STORE
                </h1>
                <p className="text-xs text-gray-400">Premium Digital Store</p>
              </div>
            </div>
            <Badge variant="outline" className="border-purple-500/50 text-purple-300 bg-purple-500/10">
              <Zap className="w-3 h-3 mr-1" />
              ONLINE
            </Badge>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Pilih Paket Terbaik
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dapatkan akses premium dengan harga terjangkau. Pilih paket yang sesuai dengan kebutuhan Anda.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* BIASA Package */}
            <Card className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 backdrop-blur-xl overflow-hidden group hover:border-gray-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent pointer-events-none" />
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mb-4 shadow-lg">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-100">PAKET BIASA</CardTitle>
                <CardDescription className="text-gray-400">
                  Akses standar untuk pengguna umum
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {BIASA_PACKAGES.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectPackage('BIASA', pkg)}
                    disabled={!pkg.price}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group/item ${
                      pkg.price
                        ? 'bg-gray-800/50 border-gray-600/50 hover:border-gray-400/50 hover:bg-gray-700/50 cursor-pointer'
                        : 'bg-gray-900/50 border-gray-800/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {pkg.price ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                      <span className="font-medium text-gray-200">{pkg.duration}</span>
                    </div>
                    <span className={`font-bold ${pkg.price ? 'text-gray-100' : 'text-red-400'}`}>
                      {pkg.label}
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* PREMIUM Package */}
            <Card className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/30 border border-purple-500/50 backdrop-blur-xl overflow-hidden group hover:border-purple-400/50 transition-all duration-300">
              {/* Premium Badge */}
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-md opacity-50" />
                  <Badge className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold border-0 rounded-bl-xl rounded-tr-lg px-3 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    POPULER
                  </Badge>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PAKET PREMIUM
                </CardTitle>
                <CardDescription className="text-purple-200/70">
                  Akses penuh dengan fitur eksklusif
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {PREMIUM_PACKAGES.map((pkg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectPackage('PREMIUM', pkg)}
                    className="w-full p-4 rounded-xl border border-purple-500/30 bg-purple-900/30 hover:border-purple-400/50 hover:bg-purple-800/40 transition-all duration-300 flex items-center justify-between group/item cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-purple-100">{pkg.duration}</span>
                    </div>
                    <span className="font-bold text-purple-100">{pkg.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Mengapa Pilih Kami?
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '⚡', title: 'Proses Cepat', desc: 'Aktivasi instan setelah pembayaran' },
                { icon: '🔒', title: 'Aman & Terpercaya', desc: 'Transaksi dijamin aman 100%' },
                { icon: '💬', title: 'Support 24/7', desc: 'Tim support selalu siap membantu' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 text-center hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold text-gray-100 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-purple-500/30">
                  <Image
                    src="/logo.png"
                    alt="LANLAN STORE"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-gray-400">© 2024 LANLAN STORE. All rights reserved.</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Button>
            </div>
          </div>
        </footer>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Checkout
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Lengkapi data berikut untuk melanjutkan pembayaran
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Selected Package Summary */}
            {selectedPackage && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-300">Paket {selectedPackage.type}</p>
                    <p className="font-bold text-white">{selectedPackage.duration}</p>
                  </div>
                  <p className="text-xl font-bold text-purple-300">{selectedPackage.label}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nama Lengkap *</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama Anda"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">Email (Opsional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-gray-300">Link Group *</Label>
                <Textarea
                  id="notes"
                  placeholder="Masukkan link group untuk bergabung"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Batal
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
              >
                {isLoading ? (
                  'Memproses...'
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Beli
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
