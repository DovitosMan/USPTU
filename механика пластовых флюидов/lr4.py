import numpy as np
import matplotlib.pyplot as plt

Pzab = 8 * 10 ** 6
Ppl = 10 * 10 ** 6
Rk = 140
rc = 0.1
t = 100
N = 100
kappa = 0.4
Nt = 1000

h = (Rk - rc) / (N - 1)
tau = t / (Nt - 1)
r = np.arange(rc, Rk + rc, h)
P = np.zeros([Nt, N])
P[0, :] = Ppl
P[:, 0], P[:, -1] = Pzab, Ppl

P_final = np.ones_like(P, dtype=float) * P
for n in range(1, Nt):
    for i in range(1, N - 1):
        P_final[n, i] = kappa * tau * (2 * r[i] - h) / (2 * r[i] * h ** 2) * P_final[n - 1, i - 1] - (
                    2 * kappa * tau / (h ** 2) - 1) * P_final[n - 1, i] + kappa * tau * (2 * r[i] + h) / (
                                    2 * r[i] * h ** 2) * P_final[n - 1, i + 1]

j = 0
for i in P_final:
    if j % 100 == 0:
        plt.plot(r, i)
    j += 1
plt.xlabel('ri, м')
plt.ylabel('Pпл, Па')
plt.show()
