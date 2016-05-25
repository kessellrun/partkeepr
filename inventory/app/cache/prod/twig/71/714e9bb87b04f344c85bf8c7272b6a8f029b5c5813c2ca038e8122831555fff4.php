<?php

/* @Framework/Form/form_widget_simple.html.php */
class __TwigTemplate_3a0846cb929e1916baff1c0de511ecfaa8ee5751032ed681ef87fc29acbd4855 extends Twig_Template
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
        $__internal_f9b661f78185ea843e782d4e1523fc9873c2f1c11a280a4a911c033f354e2e4e = $this->env->getExtension("native_profiler");
        $__internal_f9b661f78185ea843e782d4e1523fc9873c2f1c11a280a4a911c033f354e2e4e->enter($__internal_f9b661f78185ea843e782d4e1523fc9873c2f1c11a280a4a911c033f354e2e4e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget_simple.html.php"));

        // line 1
        echo "<input type=\"<?php echo isset(\$type) ? \$view->escape(\$type) : 'text' ?>\" <?php echo \$view['form']->block(\$form, 'widget_attributes') ?><?php if (!empty(\$value) || is_numeric(\$value)): ?> value=\"<?php echo \$view->escape(\$value) ?>\"<?php endif ?> />
";
        
        $__internal_f9b661f78185ea843e782d4e1523fc9873c2f1c11a280a4a911c033f354e2e4e->leave($__internal_f9b661f78185ea843e782d4e1523fc9873c2f1c11a280a4a911c033f354e2e4e_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget_simple.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="<?php echo isset($type) ? $view->escape($type) : 'text' ?>" <?php echo $view['form']->block($form, 'widget_attributes') ?><?php if (!empty($value) || is_numeric($value)): ?> value="<?php echo $view->escape($value) ?>"<?php endif ?> />*/
/* */
