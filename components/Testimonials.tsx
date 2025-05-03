'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Soldado Alpha',
    role: 'Ex-Falido',
    content:
      'Antes do FLOW//REBORN eu estava no fundo do poço. Hoje já recuperei 70% do que perdi.',
    image: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1745630513/netto_binv6m.png',
  },
  {
    name: 'Soldado Beta',
    role: 'Em Recuperação',
    content: 'O sistema de guerra é real. Em 3 meses já recuperei mais de 50k.',
    image: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1745630513/netto_binv6m.png',
  },
  {
    name: 'Soldado Gamma',
    role: 'Sobrevivente',
    content: 'Melhor investimento que fiz. O suporte é incrível e as estratégias funcionam.',
    image: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1745630513/netto_binv6m.png',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-12"
        >
          DEPOIMENTOS DA GUERRA
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900/50 p-6 rounded-lg border border-red-500/20"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-red-500">{testimonial.name}</h3>
                  <p className="text-sm text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-zinc-300">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
