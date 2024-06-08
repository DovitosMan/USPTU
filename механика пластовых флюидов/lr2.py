import numpy as np
import matplotlib.pyplot as plt
from math import *

Rk = 100
rc = 0.1
Pk = 10
Pc = 8
n = int(input('Количество разбиений '))
h = (Rk - rc) / n

r_i = []
for i in range(n + 1):
    r_i.append(i * h + rc)

list1 = []
list2 = []
list3 = []
for i in range(n - 1):
    list1.append(2 * r_i[i + 1] - h)
    list2.append(-4 * r_i[i + 1])
    list3.append(2 * r_i[i + 1] + h)

Pr = np.zeros(n - 1)
Pr[0] = -(2 * r_i[1] - h) * Pc
Pr[-1] = -(2 * r_i[n - 1] + h) * Pk

L1 = np.zeros((n - 1, n - 1))
for i in range(n - 1):
    L1[i, i] = list2[i]
for i in range(n - 2):
    L1[i + 1, i] = list1[i + 1]
for i in range(n - 2):
    L1[i, i + 1] = list3[i]

Linalg = np.linalg.inv(L1)
X = Linalg.dot(Pr)
X = np.append(X, Pk)
X = np.insert(X, 0, Pc)

X_formula = []
for i in range(len(r_i)):
    X_formula.append(Pk - (Pk - Pc) / log(Rk / rc) * log(Rk / r_i[i]))
plt.plot(r_i, X, color='blue')
plt.plot(r_i, X_formula, color='red')
plt.legend(('Матрица', 'Формула'))
plt.xlabel('r, м')
plt.ylabel('Р, МПа')
plt.xlim(0, Rk)
plt.ylim(Pc, Pk)
plt.grid(True)
plt.show()
