// Performance Monitoring Utility

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = {};
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      this.observeNavigationTiming();
      this.observeResourceTiming();
      this.observeLongTasks();
      this.observeLayoutShifts();
      this.observeLargestContentfulPaint();
      this.observeFirstInputDelay();
    }
    
    this.measureCoreWebVitals();
  }

  // Observe navigation timing
  observeNavigationTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.navigation = {
            dns: entry.domainLookupEnd - entry.domainLookupStart,
            tcp: entry.connectEnd - entry.connectStart,
            request: entry.responseStart - entry.requestStart,
            response: entry.responseEnd - entry.responseStart,
            dom: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            load: entry.loadEventEnd - entry.loadEventStart,
            total: entry.loadEventEnd - entry.fetchStart
          };
          
          this.logMetric('Navigation Timing', this.metrics.navigation);
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.navigation = observer;
    } catch (e) {
      console.warn('Navigation timing not supported');
    }
  }

  // Observe resource timing
  observeResourceTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const duration = entry.responseEnd - entry.startTime;
          
          if (duration > 1000) { // Log slow resources (>1s)
            console.warn('Slow resource:', {
              name: entry.name,
              duration: Math.round(duration),
              size: entry.transferSize,
              type: entry.initiatorType
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.resource = observer;
    } catch (e) {
      console.warn('Resource timing not supported');
    }
  }

  // Observe long tasks (>50ms)
  observeLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', {
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime)
          });
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.longtask = observer;
    } catch (e) {
      console.warn('Long task monitoring not supported');
    }
  }

  // Observe Cumulative Layout Shift (CLS)
  observeLayoutShifts() {
    try {
      let clsScore = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        }
        
        this.metrics.cls = clsScore;
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.layoutShift = observer;
    } catch (e) {
      console.warn('Layout shift monitoring not supported');
    }
  }

  // Observe Largest Contentful Paint (LCP)
  observeLargestContentfulPaint() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
        this.logMetric('LCP', this.metrics.lcp + 'ms');
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.lcp = observer;
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }
  }

  // Observe First Input Delay (FID)
  observeFirstInputDelay() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = Math.round(entry.processingStart - entry.startTime);
          this.logMetric('FID', this.metrics.fid + 'ms');
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.fid = observer;
    } catch (e) {
      console.warn('FID monitoring not supported');
    }
  }

  // Measure Core Web Vitals
  measureCoreWebVitals() {
    // Time to First Byte (TTFB)
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      this.metrics.ttfb = timing.responseStart - timing.requestStart;
    }

    // First Contentful Paint (FCP)
    if (window.performance && window.performance.getEntriesByType) {
      const paintEntries = window.performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        this.metrics.fcp = Math.round(fcpEntry.startTime);
        this.logMetric('FCP', this.metrics.fcp + 'ms');
      }
    }

    // Time to Interactive (TTI) - approximation
    if (document.readyState === 'complete') {
      this.calculateTTI();
    } else {
      window.addEventListener('load', () => this.calculateTTI());
    }
  }

  // Calculate Time to Interactive
  calculateTTI() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      this.metrics.tti = timing.domInteractive - timing.navigationStart;
      this.logMetric('TTI', this.metrics.tti + 'ms');
    }
  }

  // Custom performance mark
  mark(name) {
    if (window.performance && window.performance.mark) {
      window.performance.mark(name);
    }
  }

  // Measure between two marks
  measure(name, startMark, endMark) {
    if (window.performance && window.performance.measure) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        this.logMetric(name, Math.round(measure.duration) + 'ms');
        return measure.duration;
      } catch (e) {
        console.warn('Performance measure failed:', e);
      }
    }
    return null;
  }

  // Get all metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Log metric
  logMetric(name, value) {
    // Check if we're in development mode (simple check for browser environment)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.protocol === 'file:';
    if (isDevelopment) {
      console.log(`[Performance] ${name}:`, value);
    }
  }

  // Get performance score
  getPerformanceScore() {
    const scores = {
      lcp: this.scoreLCP(this.metrics.lcp),
      fid: this.scoreFID(this.metrics.fid),
      cls: this.scoreCLS(this.metrics.cls),
      fcp: this.scoreFCP(this.metrics.fcp),
      ttfb: this.scoreTTFB(this.metrics.ttfb)
    };

    const weights = {
      lcp: 0.25,
      fid: 0.25,
      cls: 0.25,
      fcp: 0.15,
      ttfb: 0.10
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(scores).forEach(key => {
      if (scores[key] !== null) {
        totalScore += scores[key] * weights[key];
        totalWeight += weights[key];
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : null;
  }

  // Score LCP (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
  scoreLCP(lcp) {
    if (!lcp) return null;
    if (lcp < 2500) return 100;
    if (lcp < 4000) return 50;
    return 0;
  }

  // Score FID (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
  scoreFID(fid) {
    if (!fid) return null;
    if (fid < 100) return 100;
    if (fid < 300) return 50;
    return 0;
  }

  // Score CLS (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
  scoreCLS(cls) {
    if (cls === undefined) return null;
    if (cls < 0.1) return 100;
    if (cls < 0.25) return 50;
    return 0;
  }

  // Score FCP (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
  scoreFCP(fcp) {
    if (!fcp) return null;
    if (fcp < 1800) return 100;
    if (fcp < 3000) return 50;
    return 0;
  }

  // Score TTFB (good: <600ms, needs improvement: 600-1500ms, poor: >1500ms)
  scoreTTFB(ttfb) {
    if (!ttfb) return null;
    if (ttfb < 600) return 100;
    if (ttfb < 1500) return 50;
    return 0;
  }

  // Generate performance report
  generateReport() {
    const score = this.getPerformanceScore();
    
    return {
      score,
      grade: this.getGrade(score),
      metrics: this.getMetrics(),
      recommendations: this.getRecommendations()
    };
  }

  // Get performance grade
  getGrade(score) {
    if (score === null) return 'N/A';
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    return 'F';
  }

  // Get performance recommendations
  getRecommendations() {
    const recommendations = [];

    if (this.metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing image sizes and server response time');
    }

    if (this.metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time');
    }

    if (this.metrics.cls > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift by adding size attributes to images and avoiding dynamic content insertion');
    }

    if (this.metrics.fcp > 1800) {
      recommendations.push('Improve First Contentful Paint by optimizing critical rendering path');
    }

    if (this.metrics.ttfb > 600) {
      recommendations.push('Reduce Time to First Byte by optimizing server response time');
    }

    return recommendations;
  }

  // Disconnect all observers
  disconnect() {
    Object.values(this.observers).forEach(observer => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

// Log performance report on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const report = performanceMonitor.generateReport();
    console.log('[Performance Report]', report);
  }, 3000); // Wait 3s for all metrics to be collected
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}
