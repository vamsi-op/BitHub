# BitViz 🔢

**Interactive Bit Manipulation Visualizer with Dynamic Variables**

Master bit operations through visual learning and dynamic interaction. BitViz makes understanding bitwise operations intuitive and fun with unlimited variables!

[Try it out](https://bitviz.vercel.app/)

## ✨ Features

### 🎯 Interactive Visualizer
- **Direct Bit Editing**: Click any bit to toggle between 0 and 1 instantly
- **Dynamic Bit Sizing**: Automatically adjusts between 8/16/32-bit display based on number size
- **Unlimited Variables**: Add/remove variables dynamically (A, B, C, D, ...)
- **Variable Selection**: Choose any two variables for operations
- **6 Operation Modes**: AND, OR, XOR, NOT, LEFT SHIFT, RIGHT SHIFT
- **Live Updates**: See results instantly as you modify values
- **Negate Button**: Quick bitwise NOT operation for each variable
- **Result Storage**: Store operation results in new variables
- **Binary & Decimal**: Dual representation for better understanding

### 💡 Bit Manipulation Tricks
- **8 Common Patterns**: 

### 📚 Practice Problems
- **4 LeetCode-style Problems**: Learn through real algorithm challenges
- **Beginner-Friendly**: Progressive difficulty with clear explanations

### 🎨 Design
- **Modern Dark Theme**
- **Fully Responsive**
- **Smooth Animations**
- **Accessibility**

## 🚀 Quick Start

### Try Online
Visit: [BitViz](https://bitviz.vercel.app/)

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

1. **Manage Variables**:
   - Start with variables A and B
   - Click **+ Add Variable** to create C, D, E, etc.
   - Click **− Remove Last** to delete the most recent variable
   - Each variable has a negate button (~) for quick NOT operation

2. **Edit Values**:
   - Type decimal values directly in the input fields
   - Or click individual bits to toggle them between 0 and 1
   - Use arrow keys to navigate between bits

3. **Select Operation**:
   - Choose **Variable 1** and **Variable 2** from dropdowns
   - Pick an operation mode: AND, OR, XOR, NOT, LEFT SHIFT, or RIGHT SHIFT
   - For shift operations, specify the number of positions

4. **View Results**:
   - Watch bits transform in real-time with color highlighting
   - Green highlights show 1 bits in the result
   - Click **~ Negate Result** to flip all result bits
   - Click **⬆️ Move to New Variable** to store result in a new variable

5. **Explore Tricks**:
   - Scroll to **Common Bit Manipulation Tricks**
   - Click **Try it** on any trick to see it in action
   - Tricks use Variable A (and B for swap operation)
   - Modify input positions for bit toggle/set/clear/check operations

6. **Practice Problems**:
   - Read the problem description
   - Try to solve it mentally
   - Click **Show Solution** to reveal the approach
   - Click **Hide Solution** to test yourself again

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Unicode emojis for lightweight UI
- **Deployment**: Vercel (optimized for static sites)
- **Zero Dependencies**: Pure vanilla implementation, no frameworks or libraries

## 📚 Features in Detail

### Bit Operations Visualized
- **AND (&)**: Returns 1 only if BOTH bits are 1
- **OR (|)**: Returns 1 if ANY bit is 1  
- **XOR (^)**: Returns 1 if bits are DIFFERENT
- **NOT (~)**: Flips all bits (0→1, 1→0)
- **LEFT SHIFT (<<)**: Shifts bits left, multiplies by 2^n
- **RIGHT SHIFT (>>)**: Shifts bits right, divides by 2^n

### Variable Management
- **Dynamic Creation**: Add as many variables as needed (A, B, C, D, ...)
- **Flexible Selection**: Choose any pair of variables for operations
- **Quick Negation**: One-click bitwise NOT for each variable
- **Result Storage**: Save operation results as new variables
- **Auto Bit-Sizing**: All variables adjust to the largest value's bit requirements

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


## 🐛 Troubleshooting

**Binary display not updating?**
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check if JavaScript is enabled in your browser

**Bits not toggling when clicked?**
- Ensure the input field is not disabled
- Try clicking directly on the input box

**Operations showing wrong results?**
- Make sure you're using valid 32-bit integers
- Range: -2,147,483,648 to 2,147,483,647
- Check which variables are selected in the dropdowns

**Can't add more variables?**
- There's no hard limit, but performance may vary with many variables
- Consider refreshing if the page becomes slow

**Animations too fast?**
- Animations are optimized for smooth learning (600ms)
- They trigger automatically when values change

---


**Happy Learning! 🚀**

---

*BitViz - Where bits come to life!*

**Made with 💚 for developers mastering DSA**

---