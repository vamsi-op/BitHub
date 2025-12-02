# BitViz 🔢

**Interactive Bit Manipulation Visualizer with Python Playground**

Master bit operations through visual learning and hands-on coding. BitViz makes understanding bitwise operations intuitive and fun!

[Try it out](https://bitviz.vercel.app/)

## ✨ Features

### 🎯 Interactive Visualizer
- **Direct Bit Editing**: Edit bits directly - just type 0 or 1
- **Dynamic Bit Sizing**: Automatically adjusts between 8/16/32-bit display based on number size
- **6 Operation Modes**: AND, OR, XOR, NOT, LEFT SHIFT, RIGHT SHIFT
- **Live Updates**: See results instantly as you modify values
- **Binary & Decimal**: Dual representation for better understanding

### 🐍 Python Playground
- **Code Editor**: Write Python bit manipulation code in the browser
- **Real-time Execution**: Run Python-like code without backend
- **Step-by-Step Visualization**: See each bit operation's transformation visually
- **Variable Tracking**: Automatic extraction and binary display of numeric variables
- **6 Built-in Examples**: Learn from ready-to-run code snippets

### 🎨 Design
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging visual feedback and transitions
- **Accessibility**: Keyboard navigation, clear typography, and high contrast

## 🚀 Quick Start

### Try Online
Visit: [Try it out](https://bitviz.vercel.app/)

### Run Locally
```bash
# Clone the repository
git clone https://github.com/vamsi-op/BitViz.git

# Navigate to directory
cd BitViz

# Open in browser (no build required!)
# Option 1: Double-click index.html
# Option 2: Use Python server
python -m http.server 8000
# Visit http://localhost:8000
```

## 💻 Usage Guide

### Interactive Visualizer

1. **Enter Numbers**: Type in decimal values or click on individual bits to toggle them
2. **Select Operation**: Choose from AND, OR, XOR, NOT, LEFT SHIFT, or RIGHT SHIFT
3. **See Results**: Watch bits transform in real-time with color highlighting
4. **Explore Tricks**: Try 8 common bit manipulation patterns (power of 2, count bits, swap, etc.)
5. **Practice**: Solve 4 LeetCode-style problems with detailed solutions

### Python Playground

1. **Write Code**: Use the built-in editor to write Python bit manipulation code
```python
a = 12  # 1100
b = 10  # 1010
result = a & b  # 1000 = 8
print(f"Result: {result}")
```

2. **Run Code**: Click "▶ Run Code" or press `Ctrl+Enter`

3. **View Visualization**: See each operation displayed step-by-step:
   - Operand A in binary (grouped by 4 bits)
   - Operand B in binary
   - Result highlighted in green
   - Decimal values shown alongside

4. **Track Variables**: All numeric variables automatically appear in the variables section

5. **Load Examples**: Click any example card to load pre-written code

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling**: Custom CSS with CSS Variables for theming
- **Deployment**: Vercel (optimized for static sites)
- **Zero Dependencies**: Pure vanilla implementation, no npm packages

## 📚 Features in Detail

### Bit Operations Visualized
- **AND (&)**: Returns 1 only if BOTH bits are 1
- **OR (|)**: Returns 1 if ANY bit is 1  
- **XOR (^)**: Returns 1 if bits are DIFFERENT
- **NOT (~)**: Flips all bits (0→1, 1→0)
- **LEFT SHIFT (<<)**: Shifts bits left, multiplies by 2^n
- **RIGHT SHIFT (>>)**: Shifts bits right, divides by 2^n

### 8 Bit Manipulation Tricks
1. Check if Power of 2: `n & (n-1) == 0`
2. Count Set Bits: Brian Kernighan's Algorithm
3. Toggle nth Bit: `n ^ (1 << pos)`
4. Set nth Bit: `n | (1 << pos)`
5. Clear nth Bit: `n & ~(1 << pos)`
6. Check nth Bit: `(n & (1 << pos)) != 0`
7. Swap Numbers: XOR swap without temp variable
8. Find Missing Number: XOR cancellation

### Python Code Examples
- Basic Operations (AND, OR, XOR)
- Bit Shifting (left/right)
- Power of 2 Check
- Count Set Bits
- Swap Without Temp
- Toggle Specific Bit

## 🎓 Learning Path

1. **Start with Visualizer** - Understand basic operations visually
2. **Try Bit Tricks** - Learn common patterns
3. **Code in Python** - Apply knowledge with real code
4. **Solve Problems** - Practice with LeetCode-style challenges
5. **Build Projects** - Use bit manipulation in your own code

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Author

**Vamsi**
- GitHub: [@vamsi-op](https://github.com/vamsi-op)
- Project Link: [https://github.com/vamsi-op/BitViz](https://github.com/vamsi-op/BitViz)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you master bit manipulation!

## Acknowledgments

- Inspired by the need for visual, interactive DSA learning tools
- The developer community for feedback and support

## 📧 Contact

Have questions or suggestions? Open an issue on GitHub or reach out through GitHub discussions.

---
## 🎨 Understanding the Colors

- **White text on dark**: Regular bits (0s)
- **Green highlight**: Result bits that are 1
- **Green accent**: Primary color for success/set bits
- **Red**: Errors or bits that are 0

---

## 🐛 Troubleshooting

**Binary display not updating?**
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors (F12)

**Operations showing wrong results?**
- Make sure you're using valid 32-bit integers
- Range: -2,147,483,648 to 2,147,483,647

**Animations too fast/slow?**
- Animations are optimized for smooth learning
- They trigger when values change

---


**Happy Learning! 🚀**
*BitViz - Where bits come to life!*
**Made with 💚 for developers mastering DSA**
