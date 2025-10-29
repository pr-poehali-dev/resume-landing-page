import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-montserrat font-bold text-xl text-foreground">А МЫ МОЖЕМ!</div>
            
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('about')} className="text-sm font-semibold hover:text-primary transition-colors">Обо мне</button>
              <button onClick={() => scrollToSection('experience')} className="text-sm font-semibold hover:text-primary transition-colors">Опыт</button>
              <button onClick={() => scrollToSection('skills')} className="text-sm font-semibold hover:text-primary transition-colors">Навыки</button>
              <button onClick={() => scrollToSection('education')} className="text-sm font-semibold hover:text-primary transition-colors">Образование</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-sm font-semibold hover:text-primary transition-colors">Портфолио</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-semibold hover:text-primary transition-colors">Контакты</button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Меню"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t animate-fade-in">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('about')} className="text-left font-semibold hover:text-primary transition-colors py-2">Обо мне</button>
                <button onClick={() => scrollToSection('experience')} className="text-left font-semibold hover:text-primary transition-colors py-2">Опыт</button>
                <button onClick={() => scrollToSection('skills')} className="text-left font-semibold hover:text-primary transition-colors py-2">Навыки</button>
                <button onClick={() => scrollToSection('education')} className="text-left font-semibold hover:text-primary transition-colors py-2">Образование</button>
                <button onClick={() => scrollToSection('portfolio')} className="text-left font-semibold hover:text-primary transition-colors py-2">Портфолио</button>
                <button onClick={() => scrollToSection('contact')} className="text-left font-semibold hover:text-primary transition-colors py-2">Контакты</button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/9b77d5b5-01c9-463a-8e9a-908af4c60a54/files/ec98b9f4-e976-47bc-bdf1-4446e75a2b29.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="font-montserrat font-black text-6xl md:text-8xl lg:text-9xl text-primary mb-4 leading-none tracking-tight">
            А МЫ МОЖЕМ!
          </h1>
          <p className="font-montserrat font-bold text-2xl md:text-4xl text-white uppercase tracking-wide">
            для взрослых с ДЦП и не только
          </p>
        </div>

        <div className="absolute bottom-8 left-8 z-10 animate-slide-up">
          <div className="bg-primary rounded-full w-24 h-24 flex items-center justify-center">
            <span className="text-5xl">🗣️</span>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
        <div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 text-foreground scroll-reveal">
            Обо мне
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover-scale scroll-reveal">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Проект «А мы можем!» создан для поддержки взрослых людей с ДЦП и другими особенностями развития. 
                Мы верим, что каждый человек способен на большее, чем кажется на первый взгляд.
              </p>
            </Card>
            <Card className="p-8 hover-scale scroll-reveal">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Наша миссия — показать обществу возможности людей с инвалидностью, помочь им раскрыть свой потенциал 
                и найти своё место в жизни.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Опыт работы
          </h2>
          <div className="space-y-8">
            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="Heart" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Волонтёрская деятельность</h3>
                  <p className="text-muted-foreground mb-2">2018 - настоящее время</p>
                  <p className="text-lg leading-relaxed">
                    Организация мероприятий, тренингов и встреч для людей с особенностями развития. 
                    Создание инклюзивного сообщества.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="Users" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Социальные проекты</h3>
                  <p className="text-muted-foreground mb-2">2020 - настоящее время</p>
                  <p className="text-lg leading-relaxed">
                    Запуск образовательных программ, мастер-классов и творческих мастерских 
                    для интеграции в общество.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="Megaphone" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Информационная работа</h3>
                  <p className="text-muted-foreground mb-2">2019 - настоящее время</p>
                  <p className="text-lg leading-relaxed">
                    Ведение социальных сетей, публикация статей и материалов о жизни людей с инвалидностью. 
                    Борьба со стереотипами.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Навыки и компетенции
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="MessageCircle" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">Коммуникация</h3>
              <p className="text-muted-foreground">
                Работа с людьми, эмпатия, умение слушать и поддерживать
              </p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="Lightbulb" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">Креативность</h3>
              <p className="text-muted-foreground">
                Разработка новых идей, проектов и мероприятий
              </p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="Target" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">Организация</h3>
              <p className="text-muted-foreground">
                Планирование и координация социальных проектов
              </p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="BookOpen" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">Образование</h3>
              <p className="text-muted-foreground">
                Разработка учебных программ и проведение занятий
              </p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="Camera" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">SMM</h3>
              <p className="text-muted-foreground">
                Ведение социальных сетей, создание контента
              </p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="HandHeart" className="text-primary mb-4" size={40} />
              <h3 className="font-montserrat font-bold text-xl mb-3">Волонтёрство</h3>
              <p className="text-muted-foreground">
                Помощь нуждающимся, организация благотворительности
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="education" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Образование
          </h2>
          <div className="space-y-6">
            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Социальная работа</h3>
                  <p className="text-muted-foreground mb-2">2015 - 2019</p>
                  <p className="text-lg">Высшее образование по специальности "Социальная работа с людьми с ограниченными возможностями"</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Курсы повышения квалификации</h3>
                  <p className="text-muted-foreground mb-2">2020 - 2023</p>
                  <p className="text-lg">Инклюзивное образование, арт-терапия, социальное проектирование</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Портфолио проектов
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Palette" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">Творческие мастерские</h3>
                <p className="text-muted-foreground mb-4">
                  Организация еженедельных занятий по рисованию, лепке и рукоделию для людей с особенностями развития
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Арт-терапия</Badge>
                  <Badge>Инклюзия</Badge>
                  <Badge>Творчество</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Music" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">Инклюзивный фестиваль</h3>
                <p className="text-muted-foreground mb-4">
                  Ежегодный фестиваль талантов, где люди с инвалидностью демонстрируют свои способности в музыке, танцах и театре
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Мероприятие</Badge>
                  <Badge>Социализация</Badge>
                  <Badge>Культура</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Laptop" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">Онлайн-платформа</h3>
                <p className="text-muted-foreground mb-4">
                  Создание интернет-ресурса для обмена опытом, поиска помощи и общения людей с ОВЗ
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>IT</Badge>
                  <Badge>Сообщество</Badge>
                  <Badge>Поддержка</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Heart" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">Группы взаимопомощи</h3>
                <p className="text-muted-foreground mb-4">
                  Регулярные встречи для обмена опытом, эмоциональной поддержки и решения общих проблем
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Психология</Badge>
                  <Badge>Поддержка</Badge>
                  <Badge>Общение</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 text-foreground text-center scroll-reveal">
            Контакты
          </h2>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Свяжитесь с нами для сотрудничества или участия в проектах
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="Mail" className="text-primary mb-4 mx-auto" size={40} />
              <h3 className="font-bold mb-2 text-center">Email</h3>
              <p className="text-muted-foreground text-center">info@amymozhem.ru</p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="Phone" className="text-primary mb-4 mx-auto" size={40} />
              <h3 className="font-bold mb-2 text-center">Телефон</h3>
              <p className="text-muted-foreground text-center">+7 (999) 123-45-67</p>
            </Card>

            <Card className="p-6 hover-scale scroll-reveal">
              <Icon name="MessageCircle" className="text-primary mb-4 mx-auto" size={40} />
              <h3 className="font-bold mb-2 text-center">ВКонтакте</h3>
              <a 
                href="https://vk.com/amymozhem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline block text-center"
              >
                vk.com/amymozhem
              </a>
            </Card>
          </div>

          <Card className="p-8 max-w-2xl mx-auto scroll-reveal">
            <h3 className="font-montserrat font-bold text-2xl mb-6 text-center">Напишите нам</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Ваше имя
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  placeholder="Расскажите, чем мы можем помочь"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full font-montserrat font-bold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">&copy; 2024 А мы можем! Все права защищены.</p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110 animate-fade-in"
          aria-label="Наверх"
        >
          <Icon name="ArrowUp" size={24} />
        </button>
      )}
    </div>
  );
};

export default Index;