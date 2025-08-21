<template>
  <div class="welcome-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Welcome to <span class="gradient-text">NotesCanvas</span>
        </h1>
        <p class="hero-subtitle">
          Create, organize, and manage your ideas with interactive sticky notes on an infinite canvas
        </p>
      </div>
      
      <!-- Animated boxes preview -->
      <div class="preview-area">
        <div class="preview-box box-1">
          <div class="box-content">💡 Ideas</div>
        </div>
        <div class="preview-box box-2">
          <div class="box-content">📝 Notes</div>
        </div>
        <div class="preview-box box-3">
          <div class="box-content">🎯 Tasks</div>
        </div>
      </div>
    </div>

    <!-- How to Use Section -->
    <div class="features-section">
      <h2 class="section-title">How to Use Your Canvas</h2>
      
      <div class="feature-grid">
        <!-- Create Notes -->
        <div class="feature-card">
          <div class="feature-icon create-icon">
            <v-icon size="32" color="white">mdi-plus-circle</v-icon>
          </div>
          <h3 class="feature-title">Create New Notes</h3>
          <p class="feature-description">
            Right-click anywhere on the canvas to create a new sticky note. Choose from various colors to organize your thoughts.
          </p>
          <div class="feature-demo">
            <span class="demo-text">Right-click</span>
            <v-icon class="demo-arrow">mdi-arrow-right</v-icon>
            <div class="mini-box">New Note</div>
          </div>
        </div>

        <!-- Edit Notes -->
        <div class="feature-card">
          <div class="feature-icon edit-icon">
            <v-icon size="32" color="white">mdi-pencil</v-icon>
          </div>
          <h3 class="feature-title">Edit & Customize</h3>
          <p class="feature-description">
            Double-click any note to open the rich text editor. Format your text, change colors, and make your notes stand out.
          </p>
          <div class="feature-demo">
            <span class="demo-text">Double-click</span>
            <v-icon class="demo-arrow">mdi-arrow-right</v-icon>
            <div class="mini-editor">📝 Editor</div>
          </div>
        </div>

        <!-- Move & Resize -->
        <div class="feature-card">
          <div class="feature-icon move-icon">
            <v-icon size="32" color="white">mdi-cursor-move</v-icon>
          </div>
          <h3 class="feature-title">Move & Resize</h3>
          <p class="feature-description">
            Drag notes around the canvas to organize your workspace. Resize them by dragging the corners to fit your content.
          </p>
          <div class="feature-demo">
            <span class="demo-text">Drag & Drop</span>
            <v-icon class="demo-arrow">mdi-arrow-right</v-icon>
            <div class="mini-box moving">📦</div>
          </div>
        </div>

        <!-- Delete Notes -->
        <div class="feature-card">
          <div class="feature-icon delete-icon">
            <v-icon size="32" color="white">mdi-delete</v-icon>
          </div>
          <h3 class="feature-title">Delete Notes</h3>
          <p class="feature-description">
            Right-click on any note to access the delete option, or use the delete button in the editor modal.
          </p>
          <div class="feature-demo">
            <span class="demo-text">Right-click note</span>
            <v-icon class="demo-arrow">mdi-arrow-right</v-icon>
            <span class="delete-text">Delete</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="tips-section">
      <h2 class="section-title">Pro Tips</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <v-icon class="tip-icon" color="primary">mdi-lightbulb-outline</v-icon>
          <p>Use different colors to categorize your notes by topic or priority</p>
        </div>
        <div class="tip-card">
          <v-icon class="tip-icon" color="success">mdi-format-text</v-icon>
          <p>Take advantage of rich text formatting for better organization</p>
        </div>
        <div class="tip-card">
          <v-icon class="tip-icon" color="warning">mdi-backup-restore</v-icon>
          <p>Your notes are automatically saved to the cloud</p>
        </div>
      </div>
    </div>

    <!-- Get Started Button -->
    <div class="cta-section">
      <v-btn 
        color="primary" 
        size="large" 
        class=""
        :to="{ name: 'page'}"
      >
        <v-icon left>mdi-rocket-launch</v-icon>
        Start Creating Notes
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  overflow-x: hidden;
}

.hero-section {
  padding: 60px 24px;
  text-align: center;
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
  margin-bottom: 60px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 24px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(45deg, #FFD700, #FF6B6B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.preview-area {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
}

.preview-box {
  position: absolute;
  width: 80px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  animation: float 3s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.preview-box:hover {
  transform: scale(1.1);
}

.box-1 {
  background: #FF6B6B;
  top: 20px;
  left: 20px;
  animation-delay: 0s;
}

.box-2 {
  background: #4ECDC4;
  top: 60px;
  right: 20px;
  animation-delay: 1s;
}

.box-3 {
  background: #45B7D1;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.features-section {
  background: white;
  padding: 80px 24px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 60px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.create-icon { background: linear-gradient(135deg, #667eea, #764ba2); }
.edit-icon { background: linear-gradient(135deg, #f093fb, #f5576c); }
.move-icon { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.delete-icon { background: linear-gradient(135deg, #fa709a, #fee140); }

.feature-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 16px;
}

.feature-description {
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
}

.demo-text {
  color: #495057;
  font-weight: 500;
}

.demo-arrow {
  color: #6c757d;
}

.mini-box, .mini-editor {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.mini-box.moving {
  animation: wiggle 1s ease-in-out infinite;
}

.delete-text {
  color: #dc3545;
  font-weight: bold;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

.tips-section {
  background: #f8f9fa;
  padding: 80px 24px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.tip-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

}
.tip-card p {
  color: black;
}

.tip-card:hover {
  transform: translateY(-4px);
}

.tip-icon {
  margin-bottom: 16px;
}

.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 24px;
  text-align: center;
}

.get-started-btn {
  font-size: 1.1rem;
  padding: 16px 32px;
  border-radius: 50px;
  text-transform: none;
  font-weight: bold;
  text-align: top;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .preview-area {
    width: 250px;
    height: 150px;
  }
  
  .preview-box {
    width: 60px;
    height: 45px;
    font-size: 0.7rem;
  }
}
</style>