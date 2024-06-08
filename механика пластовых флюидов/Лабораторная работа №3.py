import math
import sympy as sp
from sympy import sympify, solve
import numpy as np
import matplotlib.pyplot as plt

N_Well = 5
Rk = 120

Pressure_array = np.array([8.5, 9, 7, 9.5, 11])
k = 80
mu = 2
Fk = 10 * k / mu
x = np.array([30, 30, 50, 70, 70])
y = np.array([30, 70, 50, 30, 70])
Pontential_array = Pressure_array * k / mu
well_radiuses = np.array([0.1, 0.1, 0.1, 0.1, 0.1])
all_equations = []


def create_plot(X_of_wells, Y_of_wells, q_values):
    positive_integers = [int(abs(number)) for number in q_values]
    print(positive_integers)
    positive_integers = np.array(positive_integers) * 3
    print(positive_integers)
    plt.scatter(
        X_of_wells,
        Y_of_wells,
        color="blue",
        marker="o",
        label="Расположение скважин",
        s=positive_integers,
    )
    plt.title("Расположение скважин")
    plt.xlabel("Расположение по Х относительно 0")
    plt.ylabel("Расположение по У относительно 0")
    for i, (x, y) in enumerate(zip(X_of_wells, Y_of_wells)):
        plt.text(
            x,
            y,
            f"({x}, {y})\n" f"Скважина номер {i}",
            fontsize=8,
            ha="right",
            va="bottom",
        )
    plt.grid()
    # plt.show()


for i in range(N_Well):
    Fc = sp.symbols(f"Fc{i}")
    summ = []
    sum = ""
    iter_score = int(0)
    for j in range(N_Well):
        q = sp.symbols(f"q{j}")
        if j == i:
            r = well_radiuses[j]
        else:
            r = math.sqrt((x[j] - x[i]) ** 2 + (y[j] - y[i]) ** 2)
        summ.append(q * sp.log(Rk / r))
        sum += f"{1/math.pi:.3}*{summ[j]}"
        if iter_score < N_Well - 1:
            sum += f" + "
            iter_score += 1
    equation = sp.Eq(sympify(Fk - Fc).subs(Fc, Pontential_array[i]), sympify(sum))
    all_equations.append(equation)


# print(all_equations)
solution = solve(all_equations)

# print(f"Это ответ на уравнение {solution}")
list_of_q = list(solution.values())
q_values = []
create_plot(x, y, list_of_q)
