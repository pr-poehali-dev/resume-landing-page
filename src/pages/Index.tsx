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
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setParallaxOffset(window.scrollY * 0.5);
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
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/9b77d5b5-01c9-463a-8e9a-908af4c60a54/files/ec98b9f4-e976-47bc-bdf1-4446e75a2b29.jpg')`,
            transform: `translateY(${parallaxOffset}px)`,
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
          <Card className="p-8 mb-8 scroll-reveal">
            <p className="text-xl leading-relaxed mb-6">
              Привет, я - <strong>Александра Полякова</strong> - создатель этой группы, а ещё...
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💼</span>
                  <p className="text-lg">Аспирант НИУ ВШЭ СПб (Социология), исследователь, дипломированный филолог-лингвист</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌱</span>
                  <p className="text-lg">Автор и руководитель проектов по онлайн-социализации взрослых с ДЦП, представитель ДЦП-сообщества</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📚</span>
                  <p className="text-lg">Победитель конференций, участник Open Talks и круглых столов</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">😎</span>
                  <p className="text-lg">Интервьюер в собственных проектах и спикер «Таких дел», «Жизнь с ДЦП» и НИУ ВШЭ</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">💡</span>
                  <p className="text-lg">Вещатель о трудоустройстве, саморазвитии и жизни с ДЦП</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">❣️</span>
                  <p className="text-lg">Красивая, эрудированная девушка с сильным характером, с которой на самом деле максимально комфортно (по мнению моих гостей)</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-primary/5 scroll-reveal">
            <h3 className="font-montserrat font-bold text-2xl mb-6 text-center">Тут ВСЕГДА:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✍️</span>
                <p className="text-lg">Истории реальных людей</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✍️</span>
                <p className="text-lg">Честное обсуждение остро социальных тем</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✍️</span>
                <p className="text-lg">Выпуски по заявкам подписчиков</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✍️</span>
                <p className="text-lg">Яркие впечатления</p>
              </div>
            </div>
            <p className="text-center font-montserrat font-bold text-xl mt-8 text-primary">
              Подписывайтесь, ведь кто бы что ни говорил - А МЫ МОЖЕМ!
            </p>
          </Card>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Опыт и достижения
          </h2>
          <div className="space-y-8">
            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Научная деятельность</h3>
                  <p className="text-muted-foreground mb-2">НИУ ВШЭ СПб</p>
                  <p className="text-lg leading-relaxed">
                    Аспирант по направлению Социология, исследователь социальных процессов. 
                    Дипломированный филолог-лингвист.
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
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Проекты по онлайн-социализации</h3>
                  <p className="text-muted-foreground mb-2">Автор и руководитель</p>
                  <p className="text-lg leading-relaxed">
                    Создание и развитие проектов для онлайн-социализации взрослых с ДЦП. 
                    Представитель ДЦП-сообщества.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Публичные выступления</h3>
                  <p className="text-muted-foreground mb-2">Спикер и интервьюер</p>
                  <p className="text-lg leading-relaxed">
                    Победитель конференций, участник Open Talks и круглых столов. 
                    Спикер «Таких дел», «Жизнь с ДЦП» и НИУ ВШЭ.
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
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Просветительская деятельность</h3>
                  <p className="text-muted-foreground mb-2">Эксперт по социальным вопросам</p>
                  <p className="text-lg leading-relaxed">
                    Освещение тем трудоустройства, саморазвития и жизни с ДЦП. 
                    Интервьюер в собственных проектах.
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
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Аспирантура</h3>
                  <p className="text-muted-foreground mb-2">НИУ ВШЭ Санкт-Петербург</p>
                  <p className="text-lg">Аспирантура по направлению "Социология"</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-scale scroll-reveal">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon name="BookOpen" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl mb-2">Филология</h3>
                  <p className="text-muted-foreground mb-2">Высшее образование</p>
                  <p className="text-lg">Дипломированный филолог-лингвист</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-12 text-foreground scroll-reveal">
            Публикации и интервью
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Newspaper" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">«Такие дела»</h3>
                <p className="text-muted-foreground mb-4">
                  Интервью и материалы о жизни людей с ДЦП, публикации о социальных проблемах и решениях
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>СМИ</Badge>
                  <Badge>Социальная тематика</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Mic" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">«Жизнь с ДЦП»</h3>
                <p className="text-muted-foreground mb-4">
                  Спикер и эксперт проекта, рассказывающий о реальной жизни людей с особенностями здоровья
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Медиа</Badge>
                  <Badge>Личные истории</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="Users" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">НИУ ВШЭ</h3>
                <p className="text-muted-foreground mb-4">
                  Выступления и публикации на платформе вуза, участие в научных конференциях и Open Talks
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Наука</Badge>
                  <Badge>Конференции</Badge>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover-scale scroll-reveal">
              <div className="bg-primary/10 h-48 flex items-center justify-center">
                <Icon name="MessageCircle" className="text-primary" size={64} />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat font-bold text-2xl mb-3">«А мы можем!»</h3>
                <p className="text-muted-foreground mb-4">
                  Авторский проект с интервью, историями и обсуждением актуальных социальных тем
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Авторский проект</Badge>
                  <Badge>Интервью</Badge>
                  <Badge>VK</Badge>
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