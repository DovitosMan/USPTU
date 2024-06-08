import math
import random
import matplotlib.pyplot as plt
import numpy as np
import sympy as sp
from sympy import Eq, solve, symbols

N_Well = 5
Rk = 120
r = 0.1
random.seed(6)
Fc, X, Y, equations, left_Part, eq_variables = [], [], [], [], [], []
P = [8.5, 9, 7, 9.5, 11]  # МПа
mu = 2 * 10 ^ (-3)  # Па*с
k = 80 * 10 ^ (-3)  # Д
Fk = 10 * k / mu
X = np.array([30, 30, 50, 70, 70])
Y = np.array([30, 70, 50, 30, 70])
# заполнение координат скважин и списка переменных
for i in range(N_Well):
    # X.append(random.randint(0, 100))
    # Y.append(random.randint(0, 100))
    eq_variables.append(symbols(f"q{i+1}"))
eq_tuple = tuple(eq_variables)
# заполнение системы уравнений
for i in range(N_Well):
    summ = ""
    Fc.append(P[i] * k / mu)
    for j in range(N_Well):
        if i == j:
            summ += str(1 / math.pi * eq_tuple[j] * sp.log(Rk / r))
        else:
            r_well = math.sqrt((X[i] - X[j]) ** 2 + (Y[i] - Y[j]) ** 2)
            summ += str(1 / math.pi * eq_tuple[j] * sp.log(Rk / r_well))
        if j < N_Well - 1:
            summ += " + "
    equations.append(summ)
    left_Part.append(str(Fk - Fc[i]))
q1, q2, q3, q4, q5 = symbols(f"q1 q2 q3 q4 q5")
eq_objects = [Eq(eval(left_Part[i]), eval(equations[i])) for i in range(N_Well)]
print(left_Part)
solution = solve(eq_objects, eq_tuple)
print(solution)

marker_size = [int(abs(i)) for i in list(solution.values())]
marker_size = np.array(marker_size) * 40
plt.scatter(
    X,
    Y,
    color="blue",
    marker="v",
    s=marker_size,
)
# plt.title("Расположение скважин")
# plt.xlabel("Расположение по Х относительно 0")
# plt.ylabel("Расположение по У относительно 0")
for i, (x, y) in enumerate(zip(X, Y)):
    plt.text(
        x,
        y,
        f"({x}, {y})\n" f"Скважина номер {i+1}",
        fontsize=12,
        ha="center",
        va="top",
    )
plt.grid(True)
plt.show()
