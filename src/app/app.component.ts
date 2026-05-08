import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  // ── Envelope ──────────────────────────────────────────────
  envelopeState: 'closed' | 'opening' | 'breathing' = 'closed';
  showInvitation = false;

  openEnvelope() {
    if (this.envelopeState !== 'closed') return;
    this.envelopeState = 'opening';
    setTimeout(() => {
      this.envelopeState = 'breathing';
      this.showInvitation = true;
    }, 2800);
  }

  // ── Couple info ───────────────────────────────────────────
  groomName     = 'นายพิระวิทย์ อำพนสุวรรณ';
  groomNickname = 'แบงค์';
  brideName     = 'นางสาวลภัสรดา ขุมทอง';
  brideNickname = 'แอน';

  groomFamily = ['นาง ธมนวรรณ อำพนสุวรรณ', 'นางสาว จิ๋น อำพนสุวรรณ'];
  brideFamily = ['นางอุบล ขุมทอง', 'นายนิคม ขุมทอง'];

  weddingDate   = 'วันศุกร์ที่ 10 กรกฎาคม พ.ศ. 2569';
  weddingDateEn = 'Friday, 10 July 2026';
  weddingTime   = '09.09 น.';
  venue         = 'บ้านเลขที่ 88/2 หมู่ 12 บ.หนองน้ำใส';
  venueDetail   = 'ตำบลบ้านไผ่ อำเภอบ้านไผ่ จังหวัดขอนแก่น';
  venueAddress  = 'บ้านเลขที่ 88/2 หมู่ 12 บ้านหนองน้ำใส ต.บ้านไผ่ อ.บ้านไผ่ จ.ขอนแก่น';

  schedule = [
    { time: '09.09 น.',       event: 'แห่ขันหมาก',        icon: '💒' },
    { time: '10.00–12.00 น.', event: 'พิธีสู่ขวัญ',       icon: '🙏' },
    { time: '13.00 น.',       event: 'ฉลองมงคลสมรส',      icon: '🥂' },
  ];

  dressColors = [
    { name: 'แดง', hex: '#c0392b' },
    { name: 'ขาว', hex: '#f5f0e8', border: true },
  ];

  getMusicBg(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle("url('assets/new2.jpg')");
  }

  // ── Music ─────────────────────────────────────────────────
  isMusicPlaying = false;
  musicError     = false;
  private audio: HTMLAudioElement | null = null;

  toggleMusic() {
    if (this.musicError) return;
    if (!this.audio) {
      this.audio = new Audio('assets/music.mp3');
      this.audio.loop   = true;
      this.audio.volume = 0.55;
      this.audio.onerror = () => {
        this.musicError = true; this.isMusicPlaying = false;
        this.cdr.detectChanges();
      };
    }
    if (this.isMusicPlaying) {
      this.audio.pause();
      this.isMusicPlaying = false;
    } else {
      this.audio.play()
        .then(() => { this.isMusicPlaying = true; this.cdr.detectChanges(); })
        .catch(() => { this.musicError = true; this.cdr.detectChanges(); });
    }
  }

  // ── Slideshow ─────────────────────────────────────────────
  slideImages  = Array.from({ length: 10 }, (_, i) => `assets/new${i + 1}.jpg`);
  currentSlide = 0;
  private slideTimer: any;

  nextSlide() { this.currentSlide = (this.currentSlide + 1) % this.slideImages.length; }
  prevSlide() { this.currentSlide = (this.currentSlide - 1 + this.slideImages.length) % this.slideImages.length; }
  goToSlide(i: number) { this.currentSlide = i; }

  preWeddingPhotos = ['assets/new3.jpg', 'assets/new5.jpg', 'assets/new7.jpg'];

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit() {
    this.slideTimer = setInterval(() => {
      this.nextSlide(); this.cdr.detectChanges();
    }, 3500);
  }

  ngOnDestroy() {
    if (this.slideTimer) clearInterval(this.slideTimer);
    if (this.audio) { this.audio.pause(); this.audio = null; }
  }

  openMap() {
    window.open('https://www.google.com/maps?q=16.0417031,102.7434672', '_blank');
  }
}
