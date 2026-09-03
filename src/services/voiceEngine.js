/**
 * LifeLine Voice Engine
 * Handles STT (Speech-To-Text) and TTS (Text-To-Speech) across 6 languages:
 * Urdu (ur-PK), Punjabi (pa-PK), Pashto (ps-AF), Sindhi (sd-PK), Chinese (zh-CN), English (en-US)
 */

export const langVoiceMapping = {
  'en-US': { name: 'English (US)', bcp47: 'en-US', fallbackResponses: [
    'I found 3 cardiology specialists near Islamabad Sector H-8.',
    'Your medication reminder for Amoxicillin is set for 8:00 PM.',
    'No severe drug interactions detected between your medications.',
  ]},
  'ur-PK': { name: 'Urdu (پاکستان)', bcp47: 'ur-PK', fallbackResponses: [
    'اسلام آباد سیکٹر ایچ 8 کے قریب 3 امراض قلب کے ماہرین ملے۔',
    'آپ کی دوائی کا وقت رات 8 بجے سیٹ کر دیا گیا ہے۔',
    'آپ کی ادویات میں کوئی نقصان دہ تعامل نہیں پایا گیا۔',
  ]},
  'pa-PK': { name: 'Punjabi (پنجابی)', bcp47: 'pa-PK', fallbackResponses: [
    'راولپنڈی تے اسلام آباد چ بہترین ہسپتال لبھ گئے نے۔',
    'دوائی کھان دا وقت ہو گیا اے۔',
    'تہاڈی رپورٹ بالکل ٹھیک اے۔',
  ]},
  'ps-AF': { name: 'Pashto (پښتو)', bcp47: 'ps-AF', fallbackResponses: [
    'په اسلام اباد کې د زړه متخصصین موندل شوي.',
    'د درملو وخت وټاکل شو.',
    'هیڅ خطرناک تداخل ونه موندل شو.',
  ]},
  'sd-PK': { name: 'Sindhi (سنڌي)', bcp47: 'sd-PK', fallbackResponses: [
    'اسلام آباد ۽ راولپنڊي جا بهترين اسپتال موجود آهن.',
    'توهان جي دوا جو وقت ٿي ويو آهي.',
    'رپورٽ چڪاس ٿي وئي آهي.',
  ]},
  'zh-CN': { name: 'Chinese (中文)', bcp47: 'zh-CN', fallbackResponses: [
    '在伊斯兰堡已为您找到3家心血管专科诊所。',
    '您的阿莫西林服药提醒已设定为晚上8点。',
    '所输入的药物未检测到严重相互作用。',
  ]},
};

class VoiceEngineService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.initRecognition();
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  /**
   * Speak Text in Target Language (TTS)
   */
  speak(text, langCode = 'en-US', onEnd = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    const langInfo = langVoiceMapping[langCode] || langVoiceMapping['en-US'];
    utterance.lang = langInfo.bcp47;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try finding exact language voice match
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
  }

  /**
   * Listen to user voice (STT)
   */
  startListening(langCode = 'en-US', onResult, onError, onEnd) {
    const langInfo = langVoiceMapping[langCode] || langVoiceMapping['en-US'];

    if (!this.recognition) {
      // Simulation fallback for browsers without SpeechRecognition API
      console.log('Using simulated voice recognition fallback');
      this.isListening = true;
      setTimeout(() => {
        const simulatedText = langInfo.fallbackResponses[0];
        onResult(simulatedText, true);
        this.isListening = false;
        if (onEnd) onEnd();
      }, 3000);
      return;
    }

    try {
      this.recognition.lang = langInfo.bcp47;
      this.isListening = true;

      this.recognition.onresult = (event) => {
        let transcript = '';
        let isFinal = false;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) isFinal = true;
        }
        onResult(transcript, isFinal);
      };

      this.recognition.onerror = (err) => {
        console.error('Speech recognition error:', err);
        this.isListening = false;
        if (onError) onError(err);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
      this.isListening = false;
      if (onError) onError(e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const voiceEngine = new VoiceEngineService();
