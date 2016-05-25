<?php

/* PartKeeprSetupBundle::parameters.php.twig */
class __TwigTemplate_dce3b39ed93c4d90b74e1df593c03522639170a31113ff72fa42fa056502203e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_ed7deae46b4d238d905e5238a270b1510e7914a02fd963fcb721463e0676da74 = $this->env->getExtension("native_profiler");
        $__internal_ed7deae46b4d238d905e5238a270b1510e7914a02fd963fcb721463e0676da74->enter($__internal_ed7deae46b4d238d905e5238a270b1510e7914a02fd963fcb721463e0676da74_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprSetupBundle::parameters.php.twig"));

        // line 1
        echo "<?php
";
        // line 2
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["parameters"]) ? $context["parameters"] : null));
        foreach ($context['_seq'] as $context["name"] => $context["value"]) {
            // line 3
            echo "\$container->setParameter('";
            echo twig_escape_filter($this->env, $context["name"], "html", null, true);
            echo "', ";
            echo $context["value"];
            echo ");
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['name'], $context['value'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        
        $__internal_ed7deae46b4d238d905e5238a270b1510e7914a02fd963fcb721463e0676da74->leave($__internal_ed7deae46b4d238d905e5238a270b1510e7914a02fd963fcb721463e0676da74_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprSetupBundle::parameters.php.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  29 => 3,  25 => 2,  22 => 1,);
    }
}
/* <?php*/
/* {% for name,value in parameters %}*/
/* $container->setParameter('{{ name }}', {{ value|raw }});*/
/* {% endfor %}*/
/* */
