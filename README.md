# BitViz 🔢

**Interactive Bit Manipulation Visualizer with Python Playground**

Master bit operations through visual learning and hands-on coding. BitViz makes understanding bitwise operations intuitive and fun!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vamsi-op/BitViz)

## ✨ Features

### 🎯 Interactive Visualizer
- **Direct Bit Editing**: Edit bits directly like OTP input - just type 0 or 1
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
- **OpenAI Dark Theme**: Beautiful, professional interface (#0d0d0d, #10a37f)
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging visual feedback and transitions
- **Accessibility**: Keyboard navigation, clear typography, and high contrast

## 🚀 Quick Start

### Try Online
Visit: [BitViz on Vercel](https://your-deployment-url.vercel.app)

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

### Ideas for Contributions
- Add more example code snippets
- Create additional practice problems
- Improve mobile responsiveness
- Add dark/light theme toggle
- Support more programming languages
- Add export/share code feature

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Author

**Vamsi**
- GitHub: [@vamsi-op](https://github.com/vamsi-op)
- Project Link: [https://github.com/vamsi-op/BitViz](https://github.com/vamsi-op/BitViz)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you master bit manipulation!

## 🙏 Acknowledgments

- Inspired by the need for visual, interactive DSA learning tools
- OpenAI design language for the beautiful dark theme
- The developer community for feedback and support

## 📧 Contact

Have questions or suggestions? Open an issue on GitHub or reach out through GitHub discussions.

---

**Made with 💚 for developers mastering DSA**

*BitViz - Where bits come to life!*

## 📖 How to Use

### 🎯 Getting Started

1. **Open the visualizer** - Open `index.html` in your browser
2. **Enter numbers** - Use the input fields at the top to enter two numbers (default: 10 and 6)
3. **Watch the magic** - All bitwise operations update automatically in real-time!

---

## 🛠️ Main Features

### 1️⃣ **Binary Display (Top Section)**
- Shows the 32-bit binary representation of your numbers
- Updates instantly as you type
- Grouped in 4-bit chunks for readability

**Example:**
```
Number 1: 10  → 00000000 00000000 00000000 00001010
Number 2: 6   → 00000000 00000000 00000000 00000110
```

---

### 2️⃣ **Bitwise Operations (6 Cards)**

#### **AND Operation (&)**
- Returns 1 only if BOTH bits are 1
- **Example:** `10 & 6 = 2`
- Binary: `1010 & 0110 = 0010`

#### **OR Operation (|)**
- Returns 1 if ANY bit is 1
- **Example:** `10 | 6 = 14`
- Binary: `1010 | 0110 = 1110`

#### **XOR Operation (^)**
- Returns 1 if bits are DIFFERENT
- **Example:** `10 ^ 6 = 12`
- Binary: `1010 ^ 0110 = 1100`

#### **NOT Operation (~)**
- Flips all bits (0→1, 1→0)
- **Example:** `~10 = -11`
- Uses two's complement for negative numbers

#### **Left Shift (<<)**
- Shifts bits left, fills with 0
- Multiplies by 2^n
- **Example:** `10 << 2 = 40` (multiply by 4)
- Adjust shift amount with the input field

#### **Right Shift (>>)**
- Shifts bits right
- Divides by 2^n
- **Example:** `10 >> 2 = 2` (divide by 4)
- Adjust shift amount with the input field

---

### 3️⃣ **Common Bit Tricks (8 Cards)**

#### **Check if Power of 2**
- Click "Try it" to check if Number 1 is a power of 2
- **Formula:** `n & (n-1) == 0`
- **Example:** 16 is power of 2, 15 is not

#### **Count Set Bits**
- Counts how many 1s are in the binary representation
- Uses Brian Kernighan's Algorithm
- **Example:** `10 (1010)` has 2 set bits

#### **Toggle nth Bit**
- Flips a specific bit (0→1 or 1→0)
- Set position (0-31) and click "Try it"
- **Formula:** `n ^ (1 << pos)`

#### **Set nth Bit**
- Sets a specific bit to 1
- Set position (0-31) and click "Try it"
- **Formula:** `n | (1 << pos)`

#### **Clear nth Bit**
- Sets a specific bit to 0
- Set position (0-31) and click "Try it"
- **Formula:** `n & ~(1 << pos)`

#### **Check nth Bit**
- Checks if a specific bit is 1 or 0
- Set position (0-31) and click "Try it"
- **Formula:** `(n & (1 << pos)) != 0`

#### **Swap Two Numbers**
- Swaps Number 1 and Number 2 without temp variable
- Click "Try it" to see XOR swap in action
- **Formula:** `a ^= b; b ^= a; a ^= b;`

#### **Find Missing Number**
- Demonstrates XOR trick for finding missing numbers
- Click "Try it" to see example with [1,2,3,5]
- Shows how XOR cancels out duplicate values

---

### 4️⃣ **Practice Problems (4 Cards)**

LeetCode-style problems with solutions:

1. **Single Number** - Find the non-duplicate in array
2. **Hamming Weight** - Count 1s in binary
3. **Power of Two** - Check if n is power of 2
4. **Reverse Bits** - Reverse 32-bit number

**How to use:**
- Read the problem description
- Think about the solution
- Click "Show Solution" to reveal the answer
- Study the code and explanation

---

## 💡 Tips for Learning

### **Visual Learning**
- Watch how bits change color when they're 1
- Green highlights show the result bits
- Pay attention to bit patterns in different operations

### **Experiment**
- Try different number combinations
- Use powers of 2 (2, 4, 8, 16, 32, etc.)
- Test negative numbers to see two's complement

### **Common Patterns**
- **Even/Odd check:** `n & 1` (if 0, even; if 1, odd)
- **Multiply by 2:** `n << 1`
- **Divide by 2:** `n >> 1`
- **Clear lowest set bit:** `n & (n-1)`

---

## 🎨 Understanding the Colors

- **White text on dark**: Regular bits (0s)
- **Green highlight**: Result bits that are 1
- **Green accent**: Primary color for success/set bits
- **Red**: Errors or bits that are 0

---

## 🔥 Quick Examples to Try

### Example 1: Finding Powers of 2
```
Number 1: 16
Click "Check if Power of 2" → ✓ Is a power of 2
Explanation: 16 & 15 = 0 (10000 & 01111 = 00000)
```

### Example 2: XOR Swap
```
Number 1: 5
Number 2: 7
Click "Swap Two Numbers" → Shows a=7, b=5
No temporary variable needed!
```

### Example 3: Set a Bit
```
Number 1: 10 (binary: 1010)
Position: 0
Click "Set nth Bit" → Result: 11 (binary: 1011)
```

---

## 🚀 Pro Tips

1. **Start Simple** - Begin with small numbers (0-15) to easily see bit patterns
2. **Use Powers of 2** - Numbers like 1, 2, 4, 8, 16 have single set bits
3. **Watch Patterns** - Notice how AND filters, OR combines, XOR finds differences
4. **Practice Daily** - Try one LeetCode problem using bit manipulation daily
5. **Test Edge Cases** - Try 0, -1, maximum integers

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

## 📚 Learning Resources

### Recommended Problems
1. Start with "Single Number" (easy)
2. Move to "Hamming Weight" (easy)
3. Try "Power of Two" (easy)
4. Challenge yourself with "Reverse Bits" (medium)

### Key Concepts
- **Two's Complement**: How negative numbers work in binary
- **Bit Positions**: Rightmost is position 0 (LSB), leftmost is position 31 (MSB)
- **Shift Operations**: Efficient multiplication/division by powers of 2

---

## 🎓 Next Steps

1. **Master the basics** - Understand all 6 operations
2. **Learn the tricks** - Memorize common patterns
3. **Solve problems** - Practice with the 4 provided problems
4. **Code along** - Implement these in your favorite language
5. **Explore more** - Look up advanced bit manipulation on LeetCode

---

## 🌟 Features

✅ Real-time binary visualization  
✅ 6 core bitwise operations  
✅ 8 common bit manipulation tricks  
✅ 4 practice problems with solutions  
✅ OpenAI-inspired dark theme  
✅ Smooth animations and visual feedback  
✅ Mobile responsive design  
✅ No installation required - just open and learn!

---

**Happy Learning! 🚀**

*Made with ❤️ for DSA learners*
